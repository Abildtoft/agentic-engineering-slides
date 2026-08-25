import { defineAppSetup } from '@slidev/types'
import { configureAnalytics, disableAnalytics } from '../utils/analytics.mjs'

export default defineAppSetup(() => {
  const projectKey = import.meta.env.VITE_POSTHOG_KEY

  if (!import.meta.env.PROD || !projectKey) {
    disableAnalytics()
    return
  }

  void import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(projectKey.trim(), {
        api_host: import.meta.env.VITE_POSTHOG_HOST?.trim() || 'https://eu.i.posthog.com',
        defaults: '2026-05-30',
        persistence: 'localStorage',
        disable_session_recording: true,
        capture_pageview: 'history_change',
        capture_pageleave: true,
      })
      configureAnalytics((event, properties) => posthog.capture(event, properties))
    })
    .catch((error) => {
      console.warn('PostHog initialization failed; analytics has been disabled.', error)
      disableAnalytics()
    })
})
