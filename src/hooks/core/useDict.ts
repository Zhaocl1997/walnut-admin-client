import type { AppDictTypeCommon } from '/@/api/system/dict'
import { getDictByType } from '/@/api/system/dict'

export const dictDataMap = new Map<string, AppDictTypeCommon>()

export const useDict = async (type: string) => {
  if (dictDataMap.has(type)) {
    return dictDataMap.get(type)
  }

  const res = await getDictByType(type)

  dictDataMap.set(type, res)

  return res
}
