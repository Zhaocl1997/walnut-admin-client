import type { ComputedRef } from 'vue'
import type { WTable } from '../types'

import { NButton, NSpace } from 'naive-ui'

export const useTableColumns = (props: ComputedRef<WTable.Props>) => {
  const columns = ref<WTable.Columns>([])

  watchEffect(() => {
    columns.value = props.value.columns?.map((item) => {
      if ((item as WTable.ExtendType.Action).extendType === 'action') {
        return {
          key: 'ExtendAction',
          title: 'Action',

          render() {
            return (
              <NSpace size="small">
                <NButton>Create</NButton>
                <NButton>Read</NButton>
                <NButton>Delete</NButton>
              </NSpace>
            )
          },
        }
      }

      if ((item as WTable.ExtendType.Icon).extendType === 'icon') {
        return {
          ...item,
          key: 'ExtendIcon',
          render() {
            return <w-icon icon={item.extendIconName}></w-icon>
          },
        }
      }

      return item
    })
  })

  return {
    columns,
  }
}
