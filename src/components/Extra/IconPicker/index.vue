<template>
  <n-input
    ref="rootInputRef"
    v-model:value="value"
    readonly
    clearable
    :placeholder="t('comp:iconPicker:title')"
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
        <!-- <template #header>
          <n-text type="info">{{ t('comp:iconPicker:title') }}</n-text>
        </template> -->

        <template #trigger>
          <div class="cursor-pointer -mb-2 -ml-1">
            <w-icon
              :icon="value || 'ant-design:home-outlined'"
              width="24"
            ></w-icon>
          </div>
        </template>

        <template #default>
          <n-spin :show="loading">
            <div class="vstack justify-center items-center">
              <n-input
                ref="searchInputRef"
                v-model:value="filters"
                size="small"
                clearable
                :placeholder="t('comp:iconPicker:ph')"
                @input="debouncedInit"
                class="w-full mt-1 mb-3 border-b-cool-gray-50"
              ></n-input>

              <n-tabs
                v-model:value="currentTab"
                type="line"
                size="small"
                animated
              >
                <n-tab-pane
                  v-for="i in iconCollectionsNameList"
                  :name="i"
                  :tab="i"
                >
                </n-tab-pane>
              </n-tabs>

              <div class="h-58 w-full hstack">
                <div class="">
                  <span
                    v-for="(icon, index) in lists"
                    :key="icon"
                    :title="icon"
                  >
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
                    />
                  </span>
                </div>

                <n-empty class="pt-12" v-show="lists.length === 0" />
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
                    {{ t('comp:pagination:total', { total }) }}
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
  import { mockListApi } from '/@/utils/mockListApi'
  import { iconCollectionsNameList } from '/@/components/UI/Icon/src/utils/collections'
  import iconLists from '/@/components/UI/Icon/src/utils/list'

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
      currentTab: 'ant-design',
    })
  )

  watch(currentTab, () => onInit())

  const onInit = (needFeedback = false) => {
    loading.value = true

    if (props.value && needFeedback) {
      const index =
        iconLists
          .filter((i) => i.includes(currentTab.value))
          .findIndex((item) => item === props.value) + 1

      const shouldGoPageNum = Math.floor(index / pageSize.value) + 1

      page.value = shouldGoPageNum
    }

    const filtered = iconLists.filter(
      (i) => i.includes(filters.value) && i.includes(currentTab.value)
    )

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
    emit('update:value', null)
  }
</script>
