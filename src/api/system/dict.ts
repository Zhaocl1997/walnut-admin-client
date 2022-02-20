import { BaseAPI } from '../base'

export const dictTypeAPI = new BaseAPI<AppDictType>({
  model: 'system',
  section: 'dict/type',
})

export const dictDataAPI = new BaseAPI<AppDictType>({
  model: 'system',
  section: 'dict/data',
})

export type AppDictTypeCommon = Pick<
  AppDictData,
  'value' | 'label' | 'description' | 'order'
>[]

// default all dict will cacahed for 10 minutes
export const getDictByType = (type: string) => {
  return AppAxios.get<AppDictTypeCommon>(
    {
      url: '/system/dict/data/s/' + type,
    },
    {
      cache: true,
      cachedMiliseconds: 600 * 1000,
    }
  )
}