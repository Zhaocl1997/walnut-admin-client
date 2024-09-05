/**
 * @link https://stackoverflow.com/questions/47062922/how-to-get-all-keys-with-values-from-nested-objects
 */
export const deepKeys = function* (t: Recordable, pre: any[] = []): Generator {
  if (Array.isArray(t)) {
    // eslint-disable-next-line no-useless-return
    return
  }
  else if (Object(t) === t) {
    for (const [k, v] of Object.entries(t)) yield * deepKeys(v, [...pre, k])
  }
  else {
    yield { value: pre.join('.'), label: t }
  }
}

/**
 * @description Generate view options arr through vite feature `globEager`
 * see more https://vitejs.dev/guide/features.html#glob-import
 */
export function getViewsOptions() {
  const views = import.meta.glob('@/views/**/*.vue', {
    eager: true,
    import: 'default',
  })

  const viewOptions: OptionDataItem<{ name?: string }>[] = []

  Object.entries(views).forEach(([key, value]) => {
    const field = key.replace('/src/views/', '').replace('.vue', '')

    // This is custom prop for filter vue files
    // If don't want vue file to be seen in `viewOptions`, set `defaultView` to false
    // For example, we set `defaultView` false in `404/500/auth` pages, so these pages won't be able to config in `system/menu` page
    if (getBoolean(value.defaultView)) {
      viewOptions.push({
        value: field,
        label: `@/views/${field}.vue`,
        name: value.name,
      })
    }
  })

  const nameOptions = viewOptions.map(i => ({
    value: i.name,
    label: i.name,
  }))

  return { viewOptions, nameOptions }
}

export const menuTypeOptions: OptionDataItem[] = [
  {
    value: AppConstMenuType.CATALOG,
    label: 'Catalog',
  },
  {
    value: AppConstMenuType.MENU,
    label: 'Menu',
  },
  {
    value: AppConstMenuType.ELEMENT,
    label: 'Element',
  },
]

export const menuTernalOptions: OptionDataItem[] = [
  {
    value: AppConstMenuTernal.NONE,
    label: 'Normal',
  },
  {
    value: AppConstMenuTernal.EXTERNAL,
    label: 'External',
  },
  {
    value: AppConstMenuTernal.INTERNAL,
    label: 'Internal',
  },
]
