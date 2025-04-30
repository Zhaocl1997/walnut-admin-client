export const cdnUrl
  = 'https://cdn.jsdelivr.net/npm/tinymce@6.0.0/tinymce.min.js'

export const modelUrl
  = 'https://cdn.jsdelivr.net/npm/tinymce@6.0.0/models/dom/model.min.js'

export const themeUrl
  = 'https://cdn.jsdelivr.net/npm/tinymce@6.0.0/themes/silver/theme.min.js'

export const iconsUrl
  = 'https://cdn.jsdelivr.net/npm/tinymce@6.0.0/icons/default/icons.min.js'

export function getSkinUrl(name: string) {
  return `https://cdn.jsdelivr.net/npm/tinymce@6.0.0/skins/ui/${name}`
}

export function getContenteCSSUrl(name: string) {
  return `https://cdn.jsdelivr.net/npm/tinymce@6.0.0/skins/content/${name}/content.min.css`
}

export function useTinymceCdn() {
  useScriptTag(cdnUrl)
  useScriptTag(modelUrl)
  useScriptTag(themeUrl)
  useScriptTag(iconsUrl)
}
