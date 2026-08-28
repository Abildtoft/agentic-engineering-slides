import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { allowedNodeMajors, isLfsPointer, isMp4, isPng, isWebp, runCommand, runDoctor } from '../scripts/doctor.mjs'

const MP4 = Buffer.from([0, 0, 0, 24, ...Buffer.from('ftypisom')])
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const WEBP = Buffer.from('RIFF\0\0\0\0WEBP')

function availableCommands(command) {
  if (command === 'yarn') return { ok: true, output: '4.12.0' }
  if (command === 'git') return { ok: true, output: 'git-lfs/3.7.1' }
  return { ok: false, missing: true, error: `${command} is unavailable` }
}

async function createDoctorFixture(t, { mascotSource = 'speech.mp3', video = MP4 } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'deck-doctor-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const narration = join(root, 'public', 'narration')
  await mkdir(narration, { recursive: true })
  await writeFile(join(root, 'package.json'), JSON.stringify({
    engines: { node: `^${process.versions.node.split('.')[0]}.0.0` },
    packageManager: 'yarn@4.12.0',
  }))
  await writeFile(join(narration, 'manifest.json'), JSON.stringify({
    still: '/narration/avatar-still.webp',
    slides: { 1: { audio: '/narration/speech.mp3' } },
  }))
  await writeFile(join(narration, 'mascot.json'), JSON.stringify({
    slides: { 1: { source: mascotSource, video: '/narration/mascot.mp4' } },
  }))
  await writeFile(join(narration, 'mascot.mp4'), video)
  await writeFile(join(narration, 'avatar-still.webp'), WEBP)
  await writeFile(join(narration, 'mascot-still.png'), PNG)
  return { root, narration }
}

async function invokeDoctor(root, command = availableCommands) {
  const output = []
  const errors = []
  const ok = await runDoctor({
    root,
    command,
    env: {},
    log: message => output.push(message),
    logError: message => errors.push(message),
  })
  return { ok, output, errors }
}

test('doctor recognizes supported Node engine majors', () => {
  assert.deepEqual(allowedNodeMajors('^22.0.0 || ^24.0.0'), [22, 24])
})

test('doctor distinguishes Git LFS pointers from materialized media', () => {
  assert.equal(isLfsPointer(Buffer.from('version https://git-lfs.github.com/spec/v1\noid sha256:abc\n')), true)
  assert.equal(isLfsPointer(Buffer.from('ordinary media bytes')), false)
})

test('doctor recognizes shipped media headers', () => {
  assert.equal(isMp4(MP4), true)
  assert.equal(isPng(PNG), true)
  assert.equal(isWebp(WEBP), true)

  for (const bytes of [Buffer.from('wrong format'), Buffer.alloc(4)]) {
    assert.equal(isMp4(bytes), false)
    assert.equal(isPng(bytes), false)
    assert.equal(isWebp(bytes), false)
  }
})

test('command failures preserve their diagnostics', () => {
  const result = runCommand(process.execPath, ['-e', "console.error('corepack activation failed'); process.exit(3)"])
  assert.deepEqual(result, {
    ok: false,
    missing: false,
    error: 'corepack activation failed',
  })
})

test('doctor keeps optional authoring setup nonfatal', async t => {
  const { root } = await createDoctorFixture(t)
  const result = await invokeDoctor(root)

  assert.equal(result.ok, true)
  assert.deepEqual(result.errors, [])
  assert.ok(result.output.some(line => line.includes('ELEVENLABS_API_KEY not configured')))
  assert.ok(result.output.some(line => line.includes('optional narration setup 0/5')))
})

test('doctor surfaces failed required commands', async t => {
  const { root } = await createDoctorFixture(t)
  const result = await invokeDoctor(root, command => command === 'git'
    ? { ok: false, missing: false, error: 'git-lfs filter process failed' }
    : availableCommands(command))

  assert.equal(result.ok, false)
  assert.ok(result.errors.some(line => line.includes('Git LFS check failed: git-lfs filter process failed')))
  assert.ok(result.errors.some(line => line.includes('doctor: 1 required check failed')))
})

test('doctor rejects mismatched mascot sources and corrupt required media', async t => {
  const mismatched = await createDoctorFixture(t, { mascotSource: 'different.mp3' })
  const mismatchResult = await invokeDoctor(mismatched.root)
  assert.equal(mismatchResult.ok, false)
  assert.ok(mismatchResult.errors.some(line => line.includes('mascot source does not match current speech')))

  const corrupt = await createDoctorFixture(t, { video: Buffer.from('not an mp4') })
  const corruptResult = await invokeDoctor(corrupt.root)
  assert.equal(corruptResult.ok, false)
  assert.ok(corruptResult.errors.some(line => line.includes('does not contain a valid MP4 header')))
})

test('doctor identifies the malformed manifest file', async t => {
  const { root, narration } = await createDoctorFixture(t)
  await writeFile(join(narration, 'manifest.json'), '{ malformed')
  const result = await invokeDoctor(root)

  assert.equal(result.ok, false)
  assert.ok(result.errors.some(line => line.includes(join(narration, 'manifest.json'))))
})
