import { spawnSync } from 'node:child_process'
import { lstat, readFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '')
const LFS_HEADER = 'version https://git-lfs.github.com/spec/v1'

export function isLfsPointer(bytes) {
  return bytes.subarray(0, 200).toString('utf8').startsWith(LFS_HEADER)
}

export function isMp4(bytes) {
  return bytes.length >= 12 && bytes.subarray(4, 8).toString('ascii') === 'ftyp'
}

export function isPng(bytes) {
  return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
}

export function isWebp(bytes) {
  return bytes.length >= 12 && bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP'
}

export function allowedNodeMajors(range) {
  return range.split('||').map(part => Number(part.match(/\d+/)?.[0])).filter(Number.isInteger)
}

export function runCommand(command, args = ['--version']) {
  const result = spawnSync(command, args, { encoding: 'utf8' })
  if (result.error) {
    return {
      ok: false,
      missing: result.error.code === 'ENOENT',
      error: result.error.message,
    }
  }

  const output = `${result.stdout}${result.stderr}`.trim()
  if (result.status !== 0) {
    return {
      ok: false,
      missing: false,
      error: output || `${command} exited with status ${result.status}`,
    }
  }

  return { ok: true, output: output.split('\n')[0] }
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch (error) {
    throw new Error(`${path}: ${error.message}`, { cause: error })
  }
}

async function verifyMedia(path, kind) {
  const metadata = await lstat(path)
  if (!metadata.isFile() || metadata.isSymbolicLink()) throw new Error(`${path} is not a regular file`)
  const bytes = await readFile(path)
  if (isLfsPointer(bytes)) throw new Error(`${path} is a Git LFS pointer, not materialized media`)

  const valid = kind === 'mp4' ? isMp4(bytes) : kind === 'png' ? isPng(bytes) : isWebp(bytes)
  if (!valid) throw new Error(`${path} does not contain a valid ${kind.toUpperCase()} header`)
}

function localAssetPath(narrationDir, asset) {
  if (typeof asset !== 'string' || !asset.startsWith('/narration/')) throw new Error(`invalid narration asset path: ${asset}`)
  return join(narrationDir, basename(asset))
}

async function fileExists(path) {
  return lstat(path).then(entry => entry.isFile(), () => false)
}

export async function runDoctor({
  root = ROOT,
  command = runCommand,
  env = process.env,
  log = console.log,
  logError = console.error,
} = {}) {
  const narrationDir = join(root, 'public', 'narration')
  const failures = []
  const optional = []
  const pass = message => log(`✓ ${message}`)
  const fail = message => {
    failures.push(message)
    logError(`✗ ${message}`)
  }
  const option = (available, message) => {
    optional.push(available)
    log(`${available ? '✓' : '○'} ${message}`)
  }

  const packageJson = await readJson(join(root, 'package.json'))
  const nodeMajor = Number(process.versions.node.split('.')[0])
  const nodeMajors = allowedNodeMajors(packageJson.engines?.node ?? '')
  if (nodeMajors.includes(nodeMajor)) pass(`Node ${process.versions.node} satisfies ${packageJson.engines.node}`)
  else fail(`Node ${process.versions.node} does not satisfy ${packageJson.engines?.node ?? 'an undeclared engine'}`)

  const expectedYarn = packageJson.packageManager?.split('@').at(-1)
  const yarn = command('yarn')
  if (yarn.ok && yarn.output === expectedYarn) pass(`Yarn ${yarn.output} matches packageManager`)
  else if (!yarn.ok) fail(yarn.missing
    ? `Yarn is missing; expected ${expectedYarn ?? 'an undeclared version'}`
    : `Yarn check failed: ${yarn.error}`)
  else fail(`Yarn ${yarn.output || 'unknown'} does not match ${expectedYarn ?? 'an undeclared version'}`)

  const lfs = command('git', ['lfs', 'version'])
  if (lfs.ok) pass(lfs.output || 'Git LFS is available')
  else if (lfs.missing) fail('Git is missing; install Git and Git LFS before relying on narrated playback')
  else fail(`Git LFS check failed: ${lfs.error}`)

  try {
    const manifest = await readJson(join(narrationDir, 'manifest.json'))
    const mascot = await readJson(join(narrationDir, 'mascot.json'))
    const slideNumbers = Object.keys(manifest.slides ?? {})
    const mascotNumbers = Object.keys(mascot.slides ?? {})

    if (!slideNumbers.length || mascotNumbers.length !== slideNumbers.length) {
      throw new Error(`manifest has ${slideNumbers.length} slides; mascot manifest has ${mascotNumbers.length}`)
    }

    let originalSources = 0
    for (const no of slideNumbers) {
      const speechAsset = manifest.slides[no]?.video ?? manifest.slides[no]?.audio
      const speechFile = basename(speechAsset ?? '')
      const mascotEntry = mascot.slides[no]
      if (!speechFile || !mascotEntry) throw new Error(`slide ${no} is missing a speech or mascot entry`)
      if (mascotEntry.source !== speechFile) throw new Error(`slide ${no} mascot source does not match current speech`)

      await verifyMedia(localAssetPath(narrationDir, mascotEntry.video), 'mp4')
      if (await fileExists(localAssetPath(narrationDir, speechAsset))) originalSources += 1
    }

    await verifyMedia(localAssetPath(narrationDir, manifest.still), 'webp')
    await verifyMedia(join(narrationDir, 'mascot-still.png'), 'png')
    pass(`${slideNumbers.length} manifest entries have matching, materialized mascot video`)
    pass('narrator still assets have valid media headers')
    log(`○ original speech fallbacks present for ${originalSources}/${slideNumbers.length} slides (optional when matching mascot video ships)`)
  } catch (error) {
    fail(error.message)
  }

  option(command('ffmpeg', ['-version']).ok, 'ffmpeg available for speech pacing and mascot rendering')

  const chromeCandidates = [
    env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'google-chrome',
    'google-chrome-stable',
  ].filter(Boolean)
  const chrome = chromeCandidates.find(candidate => candidate.includes('/')
    ? command('test', ['-x', candidate]).ok
    : command(candidate).ok)
  option(Boolean(chrome), `Google Chrome ${chrome ? `available at ${chrome}` : 'missing (needed only for mascot rendering)'}`)
  const elevenLabsConfigured = Boolean(env.ELEVENLABS_API_KEY)
  const mascotConfigured = Boolean(env.MASCOT_API_KEY)
  option(elevenLabsConfigured, `ELEVENLABS_API_KEY ${elevenLabsConfigured ? 'configured' : 'not configured (needed only for paid speech synthesis)'}`)
  option(mascotConfigured, `MASCOT_API_KEY ${mascotConfigured ? 'configured' : 'not configured (needed only for mascot inference and renderer install)'}`)

  const rendererInstalled = await fileExists(join(root, 'scripts', 'mascot-render', '.pnp.cjs')) ||
    await fileExists(join(root, 'scripts', 'mascot-render', 'node_modules', '@mascotbot', 'core', 'package.json'))
  option(rendererInstalled, `isolated Mascotbot renderer dependencies ${rendererInstalled ? 'installed' : 'missing (needed only to render new mascot clips)'}`)

  if (failures.length) {
    logError(`\ndoctor: ${failures.length} required check${failures.length === 1 ? '' : 's'} failed`)
    return false
  }

  const optionalReady = optional.filter(Boolean).length
  log(`\ndoctor: required checks passed; optional narration setup ${optionalReady}/${optional.length}`)
  return true
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain && !(await runDoctor())) process.exitCode = 1
