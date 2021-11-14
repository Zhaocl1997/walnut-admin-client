<template>
  <n-space>
    <w-button
      v-for="item in options"
      :key="item.type"
      :icon="item.icon"
      :onClick="
        () =>
          onEvent({
            name: 'action',
            params: { type: item.type },
          })
      "
      :text-prop="item.text"
    >
    </w-button>
  </n-space>
</template>

<script lang="tsx" setup>
  import type { WTable } from '../types'
  import { useTableContext } from '../hooks/useTableContext'

  const { t } = useI18n()

  const { onEvent, tableProps } = useTableContext()

  const isShow = (t: WTable.HeaderActionType) =>
    (tableProps.value.actionList ?? ['create', 'update', 'delete']).includes(t)

  const options: ComputedRef<
    {
      type: WTable.HeaderActionType
      icon: string
      text: string
    }[]
  > = computed(() =>
    [
      {
        type: 'create' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('component.table.buttons.create'),
      },
      {
        type: 'update' as WTable.HeaderActionType,
        icon: 'ant-design:edit-outlined',
        text: t('component.table.buttons.edit'),
      },
      {
        type: 'delete' as WTable.HeaderActionType,
        icon: 'ant-design:delete-outlined',
        text: t('component.table.buttons.delete'),
      },
      {
        type: 'import' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('component.table.buttons.import'),
      },
      {
        type: 'export' as WTable.HeaderActionType,
        icon: 'ant-design:plus-outlined',
        text: t('component.table.buttons.export'),
      },
    ].filter((i) => isShow(i.type))
  )
</script>
