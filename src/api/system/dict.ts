import { BaseAPI } from '../base'

export const dictTypeAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/type',
})

export const dictDataAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/data',
})

export type IAppStoreMapDictValue = ({ dictData:
Pick<
  AppSystemDictData,
  'value' | 'label' | 'description' | 'order' | 'tagType'
>[] } & Pick<AppSystemDictType, 'type' | 'name'>)

// default all dict will cacahed for 10 minutes
export function getDictByType(types: string | string[]) {
  return AppAxios.get<IAppStoreMapDictValue[]>(
    {
      url: '/system/dict/data/s',
      params: { types },
      _throttle: 500,
      _cache: true,
    },
  )
}
