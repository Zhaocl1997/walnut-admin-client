import type { AppDictTypeCommon } from '/@/api/system/dict'
import { getDictByType } from '/@/api/system/dict'

export const AppDictMap = new Map<string, AppDictTypeCommon>()

export const useDict = async (type: string) => {
  if (AppDictMap.has(type)) {
    return AppDictMap.get(type)
  }

  const res = await getDictByType(type)

  AppDictMap.set(type, res)

  return res
}
