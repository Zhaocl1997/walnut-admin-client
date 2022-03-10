<template>
  <n-tooltip trigger="hover">
    {{ t('table:base:settings') }}
    <template #trigger>
      <n-popover
        v-model:show="popoverShow"
        placement="bottom"
        trigger="manual"
        @clickoutside="popoverShow = false"
      >
        <template #trigger>
          <n-button text>
            <w-icon
              icon="ant-design:setting-outlined"
              height="20"
              @click="onOpenPopover"
            ></w-icon>
          </n-button>
        </template>

        <template #header>
          <n-checkbox
            :checked="!getIndeterminate"
            :indeterminate="getIndeterminate"
            @update-checked="onUpdateCheckAllChecked"
          >
            {{ t('app:button:check') }}
          </n-checkbox>
        </template>

        <template #default>
          <div id="tableSortable">
            <div
              v-for="(item, index) in tableColumns"
              :key="item.key"
              :class="[
                'hstack justify-between my-2 mx-1',
                { 'table-column-draggable': !isInBlackList(item.key) },
              ]"
            >
              <div class="hstack items-center mr-8">
                <n-tooltip
                  :trigger="isInBlackList(item.key) ? 'click' : 'hover'"
                  placement="left"
                >
                  <template #trigger>
                    <w-icon
                      icon="ant-design:drag-outlined"
                      height="20"
                      :class="[
                        'cursor-move mr-2',
                        { 'cursor-not-allowed': isInBlackList(item.key) },
                      ]"
                    ></w-icon>
                  </template>

                  {{ t('table:base:settings:column:drag') }}
                </n-tooltip>

                <n-checkbox
                  :disabled="isInBlackList(item.key)"
                  :checked="!item.className?.includes('hidden')"
                  @update-checked="onUpdateItemChecked(index)"
                >
                  {{ getTitle(item) }}
                </n-checkbox>
              </div>

              <div class="hstack items-center justify-center">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <w-icon
                      icon="mdi:arrow-collapse-left"
                      height="20"
                      class="cursor-pointer"
                      :style="{
                        color:
                          item.fixed === 'left'
                            ? `${getCommonTheme.infoColor} !important`
                            : 'currentColor',
                      }"
                      @click="onSetFix(item.fixed, 'left', index)"
                    ></w-icon>
                  </template>

                  {{
                    item.fixed === 'left'
                      ? t('table:base:settings:column:unfix')
                      : t('table:base:settings:column:fixLeft')
                  }}
                </n-tooltip>

                <div
                  class="w-[1px] h-4/5 bg-black-300 dark:bg-gray-300 mx-1"
                ></div>

                <n-tooltip trigger="hover">
                  <template #trigger>
                    <w-icon
                      icon="mdi:arrow-collapse-right"
                      height="20"
                      class="cursor-pointer"
                      :style="{
                        color:
                          item.fixed === 'right'
                            ? `${getCommonTheme.infoColor} !important`
                            : 'currentColor',
                      }"
                      @click="onSetFix(item.fixed, 'right', index)"
                    ></w-icon>
                  </template>

                  {{
                    item.fixed === 'right'
                      ? t('table:base:settings:column:unfix')
                      : t('table:base:settings:column:fixRight')
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

<script lang="ts" setup>
  import type Sortable from 'sortablejs'
  import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'
  import type { WTable } from '../../types'

  import { useSortable } from '/@/hooks/component/useSortable'
  import { useTableContext } from '../../hooks/useTableContext'
  import { getCommonTheme } from '/@/App/src/naive'

  const { t } = useAppI18n()
  const { tableColumns } = useTableContext()

  const popoverShow = ref(false)

  const blackList = ['selection', 'index', 'action']

  const isInBlackList = (key: string) => blackList.includes(key)

  // each one not include `hidden` => true
  const getChecked = computed(() =>
    tableColumns.value.every(
      (i) => !(i.className || i.className?.includes('hidden'))
    )
  )

  // as long as one has `hidden` => true
  const getIndeterminate = computed(() =>
    tableColumns.value.some((i) => i.className?.includes('hidden'))
  )

  let inst: Sortable

  // open column setting popover
  const onOpenPopover = () => {
    popoverShow.value = true

    nextTick(() => {
      if (inst) {
        inst.destroy()
      }

      const el = document.getElementById('tableSortable')!
      inst = useSortable(el, {
        draggable: '.table-column-draggable',
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt

          const current = tableColumns.value![oldIndex!]
          tableColumns.value?.splice(oldIndex!, 1)
          tableColumns.value?.splice(newIndex!, 0, current)
        },
      })
    })
  }

  // through className to controll visibility
  const onUpdateItemChecked = (index: number) => {
    const current = tableColumns.value![index!]

    if (current.className?.includes('hidden')) {
      current.className = current.className!.replace('hidden', '')
    } else {
      if (!current.className) {
        current.className = 'hidden'
      } else {
        current.className += 'hidden'
      }
    }
  }

  // check all
  const onUpdateCheckAllChecked = () => {
    tableColumns.value.map((_, index) => onUpdateItemChecked(index))
  }

  // set column fix state
  const onSetFix = (
    itemPosition: 'left' | 'right' | undefined,
    position: 'left' | 'right',
    index: number
  ) => {
    const current = tableColumns.value![index!]

    if (!itemPosition) {
      current.fixed = position
    } else {
      current.fixed = undefined
    }
  }

  const getTitle = (item: WTable.Column) => {
    if (typeof (item as TableBaseColumn).title === 'string') {
      return (item as TableBaseColumn).title
    }

    if (typeof (item as TableBaseColumn).title === 'function') {
      // @ts-ignore
      return item.title()
    }

    return t('app:base:selection')
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WTableSettingsColumns',
  })
</script>
