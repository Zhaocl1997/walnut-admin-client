import type { ConvertNestedProperties, NullableRecord } from 'easy-fns-ts'

export type IAppSystemMenuForm = NullableRecord<ConvertNestedProperties<AppSystemMenu, 'meta'>>
