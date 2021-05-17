import { useI18n } from '/@/locales'

/**
 * @link https://stackoverflow.com/questions/47062922/how-to-get-all-keys-with-values-from-nested-objects
 */
export const deepKeys = function* (t: Recordable, pre: any[] = []): Generator {
  if (Array.isArray(t)) return
  else if (Object(t) === t)
    for (const [k, v] of Object.entries(t)) yield* deepKeys(v, [...pre, k])
  else yield { value: pre.join('.'), label: t }
}

/**
 * @description Dummy way to get real message.
 */
export const getMaybeI18nMsg = (field?: string) => {
  const { t } = useI18n()
  return field && field.includes('.') ? t(field!) : field
}

/**
 * @description Generate view options arr through vite feature `globEager`
 * see more https://vitejs.dev/guide/features.html#glob-import
 */
export const getViewsOptions = () => {
  const views = import.meta.globEager('../../../views/**/*.vue')

  const viewOptions: OptionDataItem<{ name?: string }>[] = []

  Object.entries(views).map(([key, value]) => {
    const field = key.replace('../../../views/', '').replace('.vue', '')

    // This is custom prop for filter vue files
    // If don't want vue file to be seen in `viewOptions`, set `defaultView` to false
    // For example, we set `defaultView` false in `404/500/auth` pages, so these pages won't be able to config in `system/menu` page
    if (
      value.default.defaultView === undefined ||
      value.default.defaultView === true
    ) {
      viewOptions.push({
        value: field,
        label: `/@/views/${field}.vue`,
        name: value.default.name,
      })
    }
  })

  return { viewOptions }
}
