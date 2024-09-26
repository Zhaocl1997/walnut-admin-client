import type { IAppStoreMapDictValue } from '@/api/system/dict'
import { getDictByType } from '@/api/system/dict'

const AppStoreMapDict = reactive(new Map<string, IAppStoreMapDictValue>())

function setDictIntoMap(type: string, data: IAppStoreMapDictValue) {
  return AppStoreMapDict.set(type, data)
}

export function getDictFromMap(type: string) {
  return AppStoreMapDict.get(type)
}

export function getDictNameFromMap(type: string) {
  return getDictFromMap(type)?.name
}

export function getDictDataFromMap(type: string) {
  return getDictFromMap(type)?.dictData
}

export function getDictTarget(type: string, value: StringOrNumber) {
  return getDictDataFromMap(type)?.find(i => i.value === value) || {}
}

// init dict, no return value, just set dict data into dict map
export async function initDict(types: string | string[]): Promise<void> {
  if (!types || types.length === 0) {
    AppConsoleWarn('useDict', 'Need to provide dict `types` to get dicts')
    return
  }

  if (typeof types === 'string') {
    if (AppStoreMapDict.has(types))
      return
    const res = await getDictByType(types)
    setDictIntoMap(types, res[0])
  }
  else {
    await Promise.allSettled(types.map(async (type) => {
      if (AppStoreMapDict.has(type))
        return
      const res = await getDictByType(type)
      setDictIntoMap(type, res.find(i => i.type === type)!)
    }))
  }
}

// typescript overload
export function useDict(types: string): { loading: Ref<boolean>, execDict: () => Promise<IAppStoreMapDictValue>, dictData: ComputedRef<IAppStoreMapDictValue> }
export function useDict(types: string[]): { loading: Ref<boolean>, execDict: () => Promise<IAppStoreMapDictValue[]>, dictData: ComputedRef<IAppStoreMapDictValue[]> }
export function useDict(types: string | string[]): void
export function useDict(types: string | string[]) {
  if (!types || types.length === 0) {
    AppConsoleWarn('useDict', 'Need to provide dict `types` to get dicts')
    return
  }

  const isStringType = typeof types === 'string'

  const getDictDataFromTypes = (types: string[]) => types.map(type => getDictFromMap(type))

  const loading = ref(false)
  const dictData = computed(() => {
    if (isStringType) {
      return getDictFromMap(types)
    }
    else {
      return getDictDataFromTypes(types)
    }
  })

  const execDict = async () => {
    if (isStringType) {
      if (AppStoreMapDict.has(types))
        return getDictFromMap(types)
    }

    loading.value = true
    try {
      if (isStringType) {
        const res = await getDictByType(types)
        setDictIntoMap(types, res[0])
        return res
      }
      else {
        const nonExistedDictTypes = types.filter(type => !Array.from(AppStoreMapDict.keys()).includes(type))
        if (!nonExistedDictTypes.length) {
          return getDictDataFromTypes(types)
        }
        const res = await getDictByType(nonExistedDictTypes)
        nonExistedDictTypes.map(type => setDictIntoMap(type, res.find(i => i.type === type)!))
        return getDictDataFromTypes(types)
      }
    }
    finally {
      loading.value = false
    }
  }

  return { loading, execDict, dictData }
}
