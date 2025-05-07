<script lang="ts" setup  generic="T">
import type { WTable } from '../../../types'
import { getThemeOverridesCommon } from '@/App/src/naive/src/theme'

import { useSortable } from '@vueuse/integrations/useSortable'
import { useTableContext } from '../../../hooks/useTableContext'

defineOptions({
  name: 'WTableHeaderRightColumns',
})

const { tableColumns } = useTableContext()

const popoverShow = ref(false)

const tableColumnSettingRef = ref()

const draggableClass = 'table-column-draggable'

const { start, stop } = useSortable(tableColumnSettingRef, tableColumns, {
  animation: 150,
  delay: 50,
  delayOnTouchOnly: true,

  draggable: `.${draggableClass}`,
  onEnd: (evt) => {
    const { oldIndex, newIndex } = evt

    const current = tableColumns.value![oldIndex!]
    tableColumns.value?.splice(oldIndex!, 1)
    tableColumns.value?.splice(newIndex!, 0, current)
  },
})

watchEffect(() => {
  if (popoverShow.value)
    start()

  else
    stop()
})

const blackList: StringOrNumber[] = ['selection', 'index', 'action']

const isInBlackList = (key: StringOrNumber) => blackList.includes(key)

const getChecked = computed(() =>
  tableColumns.value.every(i => i._internalShow),
)

const getIndeterminate = computed(
  () =>
    tableColumns.value.some(i => !i._internalShow)
    && tableColumns.value.some(i => i._internalShow),
)

// open column setting popover
function onOpenPopover() {
  popoverShow.value = true
}

// check one column
function onUpdateItemChecked(item: WTable.Column<T>) {
  item._internalShow = !item._internalShow
}

// check all
function onUpdateCheckAllChecked() {
  tableColumns.value
    .filter(i => !isInBlackList(i.key))
    .map(item => onUpdateItemChecked(item))
}

// set column fix state
function onSetFix(item: WTable.Column<T>, position: 'left' | 'right') {
  if (!item.fixed)
    item.fixed = position
  else
    item.fixed = undefined
}

function getTitle(item: WTable.Column<T>) {
  if (typeof item.title === 'string')
    return item.title

  // handle dict column title
  if (item.extendType === 'dict' && item.useDictNameAsTitle)
    return (`dict.name.${item.dictType}`)

  if (typeof item._titleText === 'function')
    return item._titleText()

  return ('app.base.selection')
}
</script>

<template>
  <n-tooltip trigger="hover">
    {{ $t('table.base.settings') }}
    <template #trigger>
      <n-popover v-model:show="popoverShow" placement="bottom" trigger="manual" @clickoutside="popoverShow = false">
        <template #trigger>
          <span>
            <WIconButton :icon-props="{ icon: 'ant-design:setting-outlined' }" :button-props="{ text: true, onClick: onOpenPopover }" />
          </span>
        </template>

        <template #header>
          <n-checkbox :checked="getChecked" :indeterminate="getIndeterminate" @update-checked="onUpdateCheckAllChecked">
            {{ $t('app.button.check') }}
          </n-checkbox>
        </template>

        <template #default>
          <div id="tableSortable" ref="tableColumnSettingRef">
            <div
              v-for="item in tableColumns" :key="item.key" class="mx-1 my-2 hstack justify-between" :class="[
                { draggableClass: !isInBlackList(item.key) },
              ]"
            >
              <div class="mr-8 hstack items-center">
                <n-tooltip :trigger="isInBlackList(item.key) ? 'manual' : 'hover'" placement="left">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <WIcon
                        icon="ant-design:drag-outlined" height="20" class="mr-2 cursor-move" :class="[
                          { 'cursor-not-allowed': isInBlackList(item.key) },
                        ]"
                      />
                    </n-button>
                  </template>

                  {{ $t('table.base.settings.column.drag') }}
                </n-tooltip>

                <n-checkbox
                  :disabled="isInBlackList(item.key)" :checked="item._internalShow"
                  @update-checked="onUpdateItemChecked(item)"
                >
                  {{ $t(getTitle(item)) }}
                </n-checkbox>
              </div>

              <div class="hstack items-center justify-center">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <WIcon
                        icon="mdi:arrow-collapse-left"
                        height="20"
                        class="cursor-pointer text-primary"
                        :style="{
                          color:
                            item.fixed === 'left'
                              ? `${getThemeOverridesCommon.infoColor} !important`
                              : 'currentColor',
                        }"
                        @click="!isInBlackList(item.key) && onSetFix(item, 'left')"
                      />
                    </n-button>
                  </template>

                  {{
                    item.fixed === 'left'
                      ? $t('table.base.settings.column.unfix')
                      : $t('table.base.settings.column.fixLeft')
                  }}
                </n-tooltip>

                <n-divider vertical />

                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <WIcon
                        icon="mdi:arrow-collapse-right"
                        height="20"
                        class="cursor-pointer"
                        :style="{
                          color:
                            item.fixed === 'right'
                              ? `${getThemeOverridesCommon.infoColor} !important`
                              : 'currentColor',
                        }"
                        @click="!isInBlackList(item.key) && onSetFix(item, 'right')"
                      />
                    </n-button>
                  </template>

                  {{
                    item.fixed === 'right'
                      ? $t('table.base.settings.column.unfix')
                      : $t('table.base.settings.column.fixRight')
                  }}
                </n-tooltip>
              </div>
            </div>
          </div>
        </template>
      </n-popover>
    </template>
  </n-tooltip>
</template>
