import type { AppDictTypeResponse } from '@/api/system/dict'
import { getDictByType } from '@/api/system/dict'

export const AppDictMap = reactive(new Map<string, AppDictTypeResponse>())

export const useDict = async (type: string) => {
  if (!type) return

  if (AppDictMap.has(type)) {
    return AppDictMap.get(type)
  }

  const res = await getDictByType(type)

  AppDictMap.set(type, res)

  return res
}
