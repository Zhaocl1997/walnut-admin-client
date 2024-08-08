import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals/attribution'

function logDelta({ name, delta, value, id, attribution }) {
  const eventParams = {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.
  }

  // console.log(eventParams);
}

export function reportWebVitals() {
  // Cumulative Layout Shift 累积布局偏移
  onCLS(logDelta, { reportAllChanges: true })
  // First Input Delay 首次输入延迟
  onFID(logDelta, { reportAllChanges: true })
  // Largest Contentful Paint 最大内容绘制
  onLCP(logDelta, { reportAllChanges: true })
  // First Contentful Paint 首次内容绘制
  onFCP(logDelta, { reportAllChanges: true })
  // Interaction to Next Paint
  onINP(logDelta, { reportAllChanges: true })
  // Time to First Byte 第一字节时间
  onTTFB(logDelta, { reportAllChanges: true })
}
