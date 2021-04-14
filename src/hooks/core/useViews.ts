const generateViewsOptions = (
  views: Recordable<{
    [key: string]: any
  }>
) => {
  const viewOptions: any = []

  Object.entries(views).map(([key, value]) => {
    const field = key.replace('../../views/', '').replace('.vue', '')

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

/**
 * @description Generate view options arr through vite feature `globEager`
 * see more https://vitejs.dev/guide/features.html#glob-import
 */
export const useViews = () => {
  const views = import.meta.globEager('../../views/**/*.vue')

  const { viewOptions } = generateViewsOptions(views)

  return { viewOptions }
}
