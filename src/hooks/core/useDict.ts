import type { IAppStoreMapDictValue } from '@/api/system/dict'
import type { BaseDataType } from 'easy-fns-ts'
import { getDictByTypeAPI } from '@/api/system/dict'

const AppStoreMapDict = ref(new Map<string, IAppStoreMapDictValue>())

function setDictIntoMap(type: string, data: IAppStoreMapDictValue) {
  return AppStoreMapDict.value.set(type, data)
}

function getDictFromMap(type: string) {
  return AppStoreMapDict.value.get(type)
}

export function getDictNameFromMap(type: string) {
  return getDictFromMap(type)?.name
}

export function getDictDataFromMap(type: string) {
  return getDictFromMap(type)?.dictData
}

export function getDictTarget(type: string, value: BaseDataType) {
  return getDictDataFromMap(type)?.find(i => i.value === value)
}

// init dict, no return value, just set dict data into dict map
// used for form/table/desc init
export async function initDict(types: string[]) {
  if (types.length === 0) {
    // turbo-console-disable-next-line
    console.warn('[initDict]', 'Need to provide dict `types` to get dicts')
    return
  }

  const nonExistedDictTypes = types.filter(type => !AppStoreMapDict.value.has(type))
  if (!nonExistedDictTypes.length) {
    return
  }
  // turbo-console-disable-next-line
  console.log('[initDict] Un-hit dict', nonExistedDictTypes)

  const res = await getDictByTypeAPI(nonExistedDictTypes)
  nonExistedDictTypes.map(type => setDictIntoMap(type, res.find(i => i.type === type)!))
}

// typescript overload
export function useDict(types: string): { loading: Ref<boolean>, execDict: () => Promise<IAppStoreMapDictValue>, dictData: ComputedRef<IAppStoreMapDictValue> }
export function useDict(types: string[]): { loading: Ref<boolean>, execDict: () => Promise<IAppStoreMapDictValue[]>, dictData: ComputedRef<IAppStoreMapDictValue[]> }
export function useDict(types: string | string[]): void
export function useDict(types: string | string[]) {
  if (!types || types.length === 0) {
    // turbo-console-disable-next-line
    console.warn('[useDict]', 'Need to provide dict `types` to get dicts')
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
      if (AppStoreMapDict.value.has(types))
        return getDictFromMap(types)
    }

    loading.value = true
    try {
      if (isStringType) {
        const res = await getDictByTypeAPI(types)
        setDictIntoMap(types, res[0])
        return res
      }
      else {
        const nonExistedDictTypes = types.filter(type => !AppStoreMapDict.value.has(type))
        if (!nonExistedDictTypes.length) {
          return getDictDataFromTypes(types)
        }
        const res = await getDictByTypeAPI(nonExistedDictTypes)
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
