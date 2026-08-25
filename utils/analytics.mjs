export function createAnalyticsBuffer() {
  let captureHandler = null
  let disabled = false
  const pending = []

  function disable() {
    disabled = true
    captureHandler = null
    pending.length = 0
  }

  function deliver(event, properties) {
    try {
      captureHandler(event, properties)
      return true
    } catch (error) {
      disable()
      console.warn('Analytics capture failed; analytics has been disabled.', error)
      return false
    }
  }

  return {
    capture(event, properties = {}) {
      if (disabled) return
      if (captureHandler) deliver(event, properties)
      else pending.push({ event, properties })
    },

    configure(handler) {
      if (disabled) return
      captureHandler = handler
      for (const item of pending.splice(0)) {
        if (!deliver(item.event, item.properties)) break
      }
    },

    disable,
  }
}

export function elapsedSecondsSince(startedAt, now, maxSeconds) {
  if (startedAt === null) return 0
  return Math.min(maxSeconds, Math.max(0, Math.floor((now - startedAt) / 1000)))
}

const analytics = createAnalyticsBuffer()

export const captureAnalytics = analytics.capture
export const configureAnalytics = analytics.configure
export const disableAnalytics = analytics.disable
