import { BaseAPI } from '../base'

export const dictTypeAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/type',
})

export const dictDataAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/data',
})

export type AppDictTypeCommon = Pick<
  AppSystemDictData,
  'value' | 'label' | 'description' | 'order' | 'tagType'
>[]

export interface AppDictTypeResponse {
  name: string
  type: string
  description: string
  dictData: AppDictTypeCommon
}

// default all dict will cacahed for 10 minutes
export function getDictByType(type: string) {
  return AppAxios.get<AppDictTypeResponse>(
    {
      url: `/system/dict/data/s/${type}`,
      _throttle: 500,
      _cache: true,
    },
  )
}
