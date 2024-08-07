<script lang="ts">
</script>

<script lang="ts" setup>
import type { InputInst } from 'naive-ui'
import allIcons from '/build/_generated/icon-list.ts'
import { IconBundleConfig } from '/build/icon/src/config.ts'

const props = withDefaults(defineProps<IconPickerProps>(), {
  defaultIcon: 'ant-design:home-outlined',
  preset: 'input',
})

const emit = defineEmits(['update:value'])

export default defineComponent({
  name: 'WIconPicker',

  inheritAttrs: false,
})

const ALL = 'All'

interface IconPickerProps {
  value?: string
  defaultIcon?: string
  preset?: 'input' | 'icon'
}

const { t } = useAppI18n()
const {
  page,
  pageSize,
  show,
  filters,
  rootInputRef,

  loading,
  currentTab,
  currentIcon,
} = toRefs(
  reactive({
    page: 1,
    pageSize: 50,
    show: false,
    filters: '',
    rootInputRef: null as Nullable<InputInst>,

    loading: false,
    currentTab: ALL,
    currentIcon: '',
  }),
)

const getTabLists = computed(() => [ALL, ...IconBundleConfig.list])

const getIconListsWithTab = computed<string[]>(() =>
  (allIcons as string[]).filter(i =>
    currentTab.value === ALL ? true : i.startsWith(currentTab.value),
  ),
)

const getResponse = computed(() => {
  const filtered = getIconListsWithTab.value.filter(i =>
    i.includes(filters.value),
  )

  const mock = mockListApi(filtered)

  const res = mock({
    page: {
      page: page.value,
      pageSize: pageSize.value,
    },
  })

  return res
})

// tab change & search opertaions, need to set page to 1
const getLists = computed(() => getResponse.value.data)
const getTotal = computed(() => getResponse.value.total)

// use watch to fake the loading
watchThrottled(
  () => getLists,
  () => {
    loading.value = true

    setTimeout(() => {
      loading.value = false
    }, 250)
  },
  {
    throttle: 250,
    deep: true,
  },
)

// filter input change
// immediate set page to 1
watch(
  () => filters.value,
  () => {
    page.value = 1
  },
  {
    immediate: true,
  },
)

// show change
// set filters to empty string
watch(
  () => show.value,
  () => {
    filters.value = ''
  },
  {
    immediate: true,
  },
)

function onOpenPopover() {
  onFeedback()

  show.value = true
}

function onChooseIcon(icon: string) {
  show.value = false

  emit('update:value', icon)

  // fix not trigger rule in form
  // rootInputRef.value?.focus()
  // nextTick(() => {
  //   rootInputRef.value?.blur()
  // })
}

function onClear(e: MouseEvent) {
  e.stopPropagation()
  onPageInit()
  emit('update:value', null)
}

function onMouseEnter(icon: string) {
  currentIcon.value = icon
}

function onMouseLeave() {
  currentIcon.value = props?.value ?? ''
}

function onPageInit() {
  page.value = 1
}

function onFeedback() {
  if (!props.value)
    return

  // set currentIcon
  currentIcon.value = props.value

  // set currentTab
  currentTab.value = IconBundleConfig.list.find((i: string) =>
    props.value?.startsWith(i),
  )

  // set current page
  const iconIndex = getIconListsWithTab.value.findIndex(
    item => item === props.value,
  )
  page.value = Math.floor(iconIndex / pageSize.value) + 1
}

onMounted(() => {
  onFeedback()
})
</script>

<template>
  <w-input
    v-if="preset === 'input'"
    ref="rootInputRef"
    :value="value"

    :placeholder="t('comp.iconPicker.title')"
    clearable readonly copiable
    @click="onOpenPopover"
    @clear="onClear"
  >
    <template #prefix>
      <w-icon
        class="mr-2 h-auto cursor-pointer"
        :icon="value || defaultIcon"
        width="24"
      />
    </template>
  </w-input>

  <w-icon
    v-if="preset === 'icon'"
    class="mr-2 h-auto cursor-pointer"
    :icon="value || defaultIcon"
    width="24"
    @click="onOpenPopover"
  />

  <w-modal
    v-model:show="show"
    preset="card"
    width="600px"
    :title="t('comp.iconPicker.title')"
    display-directive="show"
    :auto-focus="false"
    :default-button="false"
    :segmented="false"
  >
    <n-spin :show="loading">
      <div class="relative vstack items-center justify-center">
        <n-input
          v-model:value="filters"
          size="small"
          clearable
          :placeholder="t('comp.iconPicker.ph')"
          class="mb-3 mt-1 w-full border-b-cool-gray-50"
          @change="onPageInit"
        />

        <n-tabs
          v-model:value="currentTab"
          type="line"
          size="small"
          animated
          @update:value="onPageInit"
        >
          <n-tab-pane v-for="i in getTabLists" :key="i" :name="i" :tab="i" />
        </n-tabs>

        <div
          class="grid grid-cols-12 h-full w-full gap-2"
          @mouseleave="onMouseLeave"
        >
          <div class="col-span-3 flex items-center justify-center">
            <w-icon
              :icon="currentIcon || defaultIcon"
              height="96"
              class="drop-shadow-2xl"
            />
          </div>

          <div class="col-span-9 h-60">
            <span v-for="icon in getLists" :key="icon" :title="icon">
              <w-icon
                :icon="icon"
                width="36"
                class="m-0.5 inline border-2 border-gray-700 rounded border-solid hover:cursor-pointer" :class="[
                  {
                    'bg-light-blue-300': icon === value,
                    'hover:bg-warm-gray-300': icon !== value,
                  },
                ]"
                @click="onChooseIcon(icon)"
                @mouseenter="onMouseEnter(icon)"
              />
            </span>

            <div class="h-full flex items-center justify-center">
              <n-empty v-show="getLists.length === 0" />
            </div>
          </div>
        </div>

        <n-pagination
          v-model:page="page"
          :page-size="pageSize"
          :item-count="getTotal"
          size="small"
          class="text-sm"
          :page-slot="9"
        >
          <template #suffix>
            <span class="whitespace-nowrap">
              {{ t('comp.pagination.total', { total: getTotal }) }}
            </span>
          </template>
        </n-pagination>
      </div>
    </n-spin>
  </w-modal>
</template>
