<script lang="ts" setup>
import { sortBy } from 'lodash-es'
import type { WTable } from '../../../types'

import { useTableContext } from '../../../hooks/useTableContext'

defineOptions({
  name: 'WTableHeaderLeftActions',
})

const { t } = useI18n()

const userPermission = useAppStoreUserPermission()

const { onEvent, tableProps, checkedRowKeys } = useTableContext()

const getDeleteDisabled = computed(() => checkedRowKeys.value.length === 0)

function isShow(t: WTable.HeaderActionType) {
  return tableProps.value.headerActions!.includes(t)
}

const options: ComputedRef<
  {
    type: WTable.HeaderActionType
    text: string
    icon: string
    disabled?: boolean
    auth?: string
  }[]
> = computed(() =>
  sortBy(
    [
      {
        type: 'create' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('app.button.create'),
        auth: tableProps.value.auths?.create,
      },
      {
        type: 'update' as WTable.HeaderActionType,
        icon: 'ant-design:edit-outlined',
        text: t('app.button.read'),
        auth: tableProps.value.auths?.update,
      },
      {
        type: 'delete' as WTable.HeaderActionType,
        icon: 'ant-design:delete-outlined',
        text: t('app.button.delete'),
        disabled: getDeleteDisabled.value,
        auth: tableProps.value.auths?.deleteMany,
      },
      {
        type: 'import' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('app.button.import'),
        auth: tableProps.value.auths?.import,
      },
      {
        type: 'export' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('app.button.export'),
        auth: tableProps.value.auths?.export,
      },
    ],
    i => tableProps.value.headerActions?.indexOf(i.type),
  ).filter(i => isShow(i.type)),
)
</script>

<template>
  <div class="hstack items-center space-x-2">
    <!-- preset buttons -->
    <w-button
      v-for="item in options"
      :key="item.type"
      :icon="item.icon"
      :on-click="
        () =>
          onEvent({
            name: 'tableHeaderActions',
            params: { type: item.type },
          })
      "
      :text-prop="item.text"
      :disabled="
        item.type === 'delete' ? getDeleteDisabled : tableProps.loading
      "
      :confirm="item.type === 'delete'"
      :auth="item.auth"
    />

    <!-- extra custom buttons -->
    <w-button v-for="(item, index) in tableProps.extraHeaderActions" :key="index" v-bind="item" />

    <n-text
      v-if="
        isShow('delete')
          && userPermission.hasPermission(tableProps.auths?.deleteMany)
      "
      type="warning"
    >
      {{
        t('table.header.action.checkedText', { checked: checkedRowKeys.length })
      }}
    </n-text>
  </div>
</template>
