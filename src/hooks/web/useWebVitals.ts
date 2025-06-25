import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals/attribution'

function getDebugInfo(name: string, attribution: any) {
  // In some cases there won't be any entries (e.g. if CLS is 0,
  // or for LCP after a bfcache restore), so we have to check first.
  if (attribution) {
    if (name === 'LCP') {
      return {
        debug_url: attribution.url,
        debug_time_to_first_byte: attribution.timeToFirstByte,
        debug_resource_load_delay: attribution.resourceLoadDelay,
        debug_resource_load_time: attribution.resourceLoadTime,
        debug_element_render_delay: attribution.elementRenderDelay,
        debug_target: attribution.element || '(not set)',
      }
    }
    else if (name === 'INP') {
      return {
        debug_event: attribution.interactionType,
        debug_time: Math.round(attribution.interactionTime),
        debug_load_state: attribution.loadState,
        debug_target: attribution.interactionTarget || '(not set)',
        debug_interaction_delay: Math.round(attribution.inputDelay),
        debug_processing_duration: Math.round(attribution.processingDuration),
        debug_presentation_delay: Math.round(attribution.presentationDelay),
      }
    }
    else if (name === 'CLS') {
      return {
        debug_time: attribution.largestShiftTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.largestShiftTarget || '(not set)',
      }
    }
  }
  // Return default/empty params in case there is no attribution.
  return {
    debug_target: '(not set)',
  }
}

function sendToGoogleAnalytics({ name, delta, value, id, _entries, attribution }: any) {
  window.gtag('event', name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Value for querying in BQ
    metric_delta: delta, // Delta for querying in BQ
    // Send the returned values from getDebugInfo() as custom parameters
    ...getDebugInfo(name, attribution),
  })
}

export function reportWebVitals() {
  onLCP(sendToGoogleAnalytics)
  onINP(sendToGoogleAnalytics)
  onCLS(sendToGoogleAnalytics)
}
