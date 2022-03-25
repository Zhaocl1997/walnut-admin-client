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
        :style="{ width: '500px', position: 'relative', right: '0px' }"
      >
        <template #header>
          <n-text type="info">{{ t('comp:iconPicker:title') }}</n-text>
        </template>

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
            <div class="w-64 mt-1 mb-3">
              <n-input
                ref="searchInputRef"
                v-model:value="filters"
                size="small"
                clearable
                :placeholder="t('comp:iconPicker:ph')"
                @input="debouncedInit"
              ></n-input>
            </div>

            <div style="min-height: 230px">
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
                />
              </span>

              <n-empty v-show="lists.length === 0" />
            </div>

            <n-pagination
              v-model:page="pageNum"
              :page-size="pageSize"
              :item-count="total"
              size="small"
              class="text-sm"
              :page-slot="7"
              @update:page="init(false)"
            >
              <template #suffix>
                <span class="whitespace-nowrap">
                  {{ t('comp:pagination:total', { total }) }}
                </span>
              </template>
            </n-pagination>
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
  import iconLists from '/@/components/UI/Icon/src/utils/list'

  const props = defineProps({ value: String as PropType<string> })
  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()
  const {
    lists,
    total,
    pageNum,
    pageSize,
    show,
    filters,
    rootInputRef,
    searchInputRef,
    loading,
  } = toRefs(
    reactive({
      lists: [] as string[],
      total: 0,
      pageNum: 1,
      pageSize: 55,
      show: false,
      filters: '',
      rootInputRef: null as Nullable<InputInst>,
      searchInputRef: null as Nullable<InputInst>,
      loading: false,
    })
  )

  const init = (needFeedback?: boolean) => {
    loading.value = true
    if (props.value && needFeedback) {
      const index = iconLists.findIndex((item) => item === props.value) + 1

      const shouldGoPageNum = Math.floor(index / pageSize.value) + 1

      pageNum.value = shouldGoPageNum
    }

    const filtered = iconLists.filter((i) => i.includes(filters.value))
    const filterdRes = mockListApi(filtered)({
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    })

    setTimeout(() => {
      total.value = filterdRes.total
      lists.value = filterdRes.data
      loading.value = false
    }, 200)
  }

  const debouncedInit = useDebounceFn(() => {
    pageNum.value = 1
    init(false)
  }, 300)

  const onOpenPopover = () => {
    filters.value = ''
    show.value = true
    init(true)
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }

  const onChooseIcon = (icon: string) => {
    pageNum.value = 1
    show.value = false

    emit('update:value', icon)

    // fix not trigger rule in form
    rootInputRef.value?.focus()
    nextTick(() => {
      rootInputRef.value?.blur()
    })
  }

  const onClear = () => {
    emit('update:value', '')
  }
</script>
