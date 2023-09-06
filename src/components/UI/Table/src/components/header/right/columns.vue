<script lang="ts" setup>
import { useSortable } from '@vueuse/integrations/useSortable'
import type { WTable } from '../../../types'

import { useTableContext } from '../../../hooks/useTableContext'
import { getThemeOverridesCommon } from '@/App/src/naive/src/theme'

const { t } = useAppI18n()
const { tableColumns } = useTableContext()

const popoverShow = ref(false)

const tableColumnSettingRef = ref()

const { start, stop } = useSortable(tableColumnSettingRef, tableColumns, {
  animation: 150,
  delay: 50,
  delayOnTouchOnly: true,

  draggable: '.table-column-draggable',
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
function onUpdateItemChecked(item: WTable.Column) {
  item._internalShow = !item._internalShow
}

// check all
function onUpdateCheckAllChecked() {
  tableColumns.value
    .filter(i => !isInBlackList(i.key))
    .map(item => onUpdateItemChecked(item))
}

// set column fix state
function onSetFix(item: WTable.Column, position: 'left' | 'right') {
  if (!item.fixed)
    item.fixed = position
  else
    item.fixed = undefined
}

function getTitle(item: WTable.Column) {
  if (typeof item.title === 'string')
    return item.title

  // handle dict column title
  if (item.extendType === 'dict' && item.useDictNameAsTitle)
    return t(`dict.name.${item.dictType}`)

  if (typeof item._titleText === 'function')
    return item._titleText()

  return t('app.base.selection')
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'WTableHeaderRightColumns',
})
</script>

<template>
  <n-tooltip trigger="hover">
    {{ t('table.base.settings') }}
    <template #trigger>
      <n-popover v-model:show="popoverShow" placement="bottom" trigger="manual" @clickoutside="popoverShow = false">
        <template #trigger>
          <w-a-icon text icon="ant-design:setting-outlined" height="20" @click="onOpenPopover" />
        </template>

        <template #header>
          <n-checkbox :checked="getChecked" :indeterminate="getIndeterminate" @update-checked="onUpdateCheckAllChecked">
            {{ t('app.button.check') }}
          </n-checkbox>
        </template>

        <template #default>
          <div id="tableSortable" ref="tableColumnSettingRef">
            <div
              v-for="item in tableColumns" :key="item.key" class="hstack justify-between my-2 mx-1" :class="[
                { 'table-column-draggable': !isInBlackList(item.key) },
              ]"
            >
              <div class="hstack items-center mr-8">
                <n-tooltip :trigger="isInBlackList(item.key) ? 'manual' : 'hover'" placement="left">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <w-icon
                        icon="ant-design:drag-outlined" height="20" class="cursor-move mr-2" :class="[
                          { 'cursor-not-allowed': isInBlackList(item.key) },
                        ]"
                      />
                    </n-button>
                  </template>

                  {{ t('table.base.settings.column.drag') }}
                </n-tooltip>

                <n-checkbox
                  :disabled="isInBlackList(item.key)" :checked="item._internalShow"
                  @update-checked="onUpdateItemChecked(item)"
                >
                  {{ getTitle(item) }}
                </n-checkbox>
              </div>

              <div class="hstack items-center justify-center">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <w-icon
                        icon="mdi:arrow-collapse-left" height="20" class="cursor-pointer text-primary" :style="{
                          color:
                            item.fixed === 'left'
                              ? `${getThemeOverridesCommon.infoColor} !important`
                              : 'currentColor',
                        }" @click="
                          !isInBlackList(item.key) && onSetFix(item, 'left')
                        "
                      />
                    </n-button>
                  </template>

                  {{
                    item.fixed === 'left'
                      ? t('table.base.settings.column.unfix')
                      : t('table.base.settings.column.fixLeft')
                  }}
                </n-tooltip>

                <n-divider vertical />

                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button text :disabled="isInBlackList(item.key)">
                      <w-icon
                        icon="mdi:arrow-collapse-right" height="20" class="cursor-pointer" :style="{
                          color:
                            item.fixed === 'right'
                              ? `${getThemeOverridesCommon.infoColor} !important`
                              : 'currentColor',
                        }" @click="
                          !isInBlackList(item.key) && onSetFix(item, 'right')
                        "
                      />
                    </n-button>
                  </template>

                  {{
                    item.fixed === 'right'
                      ? t('table.base.settings.column.unfix')
                      : t('table.base.settings.column.fixRight')
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
