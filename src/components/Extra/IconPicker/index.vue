<template>
  <n-input
    ref="rootInputRef"
    v-model:value="value"
    readonly
    clearable
    :placeholder="t('comp.iconPicker.title')"
    @click="onOpenPopover"
    @clear="onClear"
  >
    <template #prefix>
      <n-popover
        v-model:show="show"
        placement="top"
        trigger="click"
        :style="{ width: '480px', position: 'relative', right: '0px' }"
      >
        <template #trigger>
          <w-icon
            class="cursor-pointer h-auto mr-2"
            :icon="value || 'ant-design:home-outlined'"
            width="24"
          ></w-icon>
        </template>

        <template #default>
          <n-spin :show="loading">
            <div class="vstack justify-center items-center">
              <n-input
                ref="searchInputRef"
                v-model:value="filters"
                size="small"
                clearable
                :placeholder="t('comp.iconPicker.ph')"
                @input="debouncedInit"
                class="w-full mt-1 mb-3 border-b-cool-gray-50"
              ></n-input>

              <n-tabs
                v-model:value="currentTab"
                type="line"
                size="small"
                animated
              >
                <n-tab-pane v-for="i in tabLists" :key="i" :name="i" :tab="i">
                </n-tab-pane>
              </n-tabs>

              <div class="h-full w-full">
                <span v-for="(icon, index) in lists" :key="icon" :title="icon">
                  <w-icon
                    :icon="icon"
                    width="36"
                    :class="[
                      'inline m-0.5 rounded border-2 border-solid border-gray-700 hover:cursor-pointer',
                      {
                        'bg-light-blue-300': icon === value,
                        'hover:bg-warm-gray-300': icon !== value,
                      },
                    ]"
                    @click="onChooseIcon(icon)"
                  ></w-icon>
                </span>

                <n-empty
                  class="flex justify-center items-center my-16"
                  v-show="lists.length === 0"
                ></n-empty>
              </div>

              <n-pagination
                v-model:page="page"
                :page-size="pageSize"
                :item-count="total"
                size="small"
                class="text-sm"
                :page-slot="7"
                @update:page="onInit(false)"
              >
                <template #suffix>
                  <span class="whitespace-nowrap">
                    {{ t('comp.pagination.total', { total }) }}
                  </span>
                </template>
              </n-pagination>
            </div>
          </n-spin>
        </template>
      </n-popover>
    </template>
  </n-input>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WIconPicker',
  })
</script>

<script lang="ts" setup>
  import type { InputInst } from 'naive-ui'
  import allIcons from '/build/_generated/icon-list.ts'
  import { IconBundleConfig } from '/build/icon/src/config.ts'

  interface IconPickerProps {
    value?: string
  }

  const props = defineProps<IconPickerProps>()
  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()
  const {
    lists,
    total,
    page,
    pageSize,
    show,
    filters,
    rootInputRef,
    searchInputRef,
    loading,
    currentTab,
  } = toRefs(
    reactive({
      lists: [] as string[],
      total: 0,
      page: 1,
      pageSize: 55,
      show: false,
      filters: '',
      rootInputRef: null as Nullable<InputInst>,
      searchInputRef: null as Nullable<InputInst>,
      loading: false,
      currentTab: 'All',
    })
  )

  const tabLists = computed(() => ['All', ...IconBundleConfig.list])

  watch(currentTab, () => {
    page.value = 1
    onInit()
  })

  const iconLists = computed<string[]>(() =>
    (allIcons as string[]).filter((i) =>
      currentTab.value === 'All' ? true : i.includes(currentTab.value)
    )
  )

  const onInit = (needFeedback = false) => {
    loading.value = true

    if (props.value && needFeedback) {
      const index =
        iconLists.value.findIndex((item) => item === props.value) + 1

      const shouldGoPageNum = Math.floor(index / pageSize.value) + 1

      page.value = shouldGoPageNum
    }

    const filtered = iconLists.value.filter((i) => i.includes(filters.value))

    const filterdRes = mockListApi(filtered)({
      page: {
        page: page.value,
        pageSize: pageSize.value,
      },
    })

    setTimeout(() => {
      total.value = filterdRes.total
      lists.value = filterdRes.data
      loading.value = false
    }, 200)
  }

  const debouncedInit = useDebounceFn(() => {
    page.value = 1
    onInit()
  }, 300)

  const onOpenPopover = () => {
    filters.value = ''
    show.value = true
    onInit(true)
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }

  const onChooseIcon = (icon: string) => {
    page.value = 1
    show.value = false

    emit('update:value', icon)

    // fix not trigger rule in form
    rootInputRef.value?.focus()
    nextTick(() => {
      rootInputRef.value?.blur()
    })
  }

  const onClear = () => {
    page.value = 1
    emit('update:value', null)
  }
</script>
