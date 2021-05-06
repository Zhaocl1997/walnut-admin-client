export const highlightSyntax = (json: string) => {
  if (!json) {
    return
  }

  // handle function type
  if (typeof json !== 'string') {
    json = JSON.stringify(
      json,
      (key, value) => {
        return typeof value === 'function'
          ? (value + '').replace(/\s/g, '')
          : value
      },
      2
    )
  }

  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|function|=>)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'number'
      if (/function|=>/.test(match)) {
        cls = 'function'
      } else if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key'
        } else {
          cls = 'string'
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (/null/.test(match)) {
        cls = 'null'
      }

      return `<span class="${cls}">${match}</span>`
    }
  )
}
