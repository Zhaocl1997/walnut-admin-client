<template>
  <w-input
    v-if="preset === 'input'"
    ref="rootInputRef"
    :value="value"
    readonly
    clearable
    :placeholder="t('comp.iconPicker.title')"
    @click="onOpenPopover"
    @clear="onClear"
    copiable
  >
    <template #prefix>
      <w-icon
        class="cursor-pointer h-auto mr-2"
        :icon="value || defaultIcon"
        width="24"
      ></w-icon>
    </template>
  </w-input>

  <w-icon
    v-if="preset === 'icon'"
    @click="onOpenPopover"
    class="cursor-pointer h-auto mr-2"
    :icon="value || defaultIcon"
    width="24"
  ></w-icon>

  <w-modal
    v-model:show="show"
    preset="card"
    style="width: 600px"
    :title="t('comp.iconPicker.title')"
    display-directive="show"
    :auto-focus="false"
    :default-button="false"
    :segmented="false"
  >
    <n-spin :show="loading">
      <div class="relative vstack justify-center items-center">
        <n-input
          v-model:value="filters"
          size="small"
          clearable
          :placeholder="t('comp.iconPicker.ph')"
          class="w-full mt-1 mb-3 border-b-cool-gray-50"
          @change="onPageInit"
        ></n-input>

        <n-tabs
          v-model:value="currentTab"
          @update:value="onPageInit"
          type="line"
          size="small"
          animated
        >
          <n-tab-pane v-for="i in getTabLists" :key="i" :name="i" :tab="i">
          </n-tab-pane>
        </n-tabs>

        <div
          class="h-full w-full grid grid-cols-12 gap-2"
          @mouseleave="onMouseLeave"
        >
          <div class="col-span-3 flex items-center justify-center">
            <w-icon
              :icon="currentIcon || defaultIcon"
              height="96"
              class="drop-shadow-2xl"
            ></w-icon>
          </div>

          <div class="col-span-9 h-60">
            <span v-for="(icon, index) in getLists" :key="icon" :title="icon">
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
                @mouseenter="onMouseEnter(icon)"
              ></w-icon>
            </span>

            <div class="h-full flex justify-center items-center">
              <n-empty v-show="getLists.length === 0"></n-empty>
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

<script lang="ts">
  export default defineComponent({
    name: 'WIconPicker',

    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import type { InputInst } from 'naive-ui'
  import allIcons from '/build/_generated/icon-list.ts'
  import { IconBundleConfig } from '/build/icon/src/config.ts'

  const ALL = 'All'

  interface IconPickerProps {
    value?: string
    defaultIcon?: string
    preset?: 'input' | 'icon'
  }

  const props = withDefaults(defineProps<IconPickerProps>(), {
    defaultIcon: 'ant-design:home-outlined',
    preset: 'input',
  })
  const emit = defineEmits(['update:value'])

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
    })
  )

  const getTabLists = computed(() => [ALL, ...IconBundleConfig.list])

  const getIconListsWithTab = computed<string[]>(() =>
    (allIcons as string[]).filter((i) =>
      currentTab.value === ALL ? true : i.startsWith(currentTab.value)
    )
  )

  const getResponse = computed(() => {
    const filtered = getIconListsWithTab.value.filter((i) =>
      i.includes(filters.value)
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
  watch(
    () => getLists,
    () => {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 300)
    },
    {
      deep: true,
      immediate: true,
    }
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
    }
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
    }
  )

  const onOpenPopover = () => {
    onFeedback()

    show.value = true
  }

  const onChooseIcon = (icon: string) => {
    show.value = false

    emit('update:value', icon)

    // fix not trigger rule in form
    // rootInputRef.value?.focus()
    // nextTick(() => {
    //   rootInputRef.value?.blur()
    // })
  }

  const onClear = (e: MouseEvent) => {
    e.stopPropagation()
    onPageInit()
    emit('update:value', null)
  }

  const onMouseEnter = (icon: string) => {
    currentIcon.value = icon
  }

  const onMouseLeave = () => {
    currentIcon.value = props?.value ?? ''
  }

  const onPageInit = () => {
    page.value = 1
  }

  const onFeedback = () => {
    if (!props.value) return

    // set currentIcon
    currentIcon.value = props.value

    // set currentTab
    currentTab.value = IconBundleConfig.list.find((i: string) =>
      props.value?.startsWith(i)
    )

    // set current page
    const iconIndex = getIconListsWithTab.value.findIndex(
      (item) => item === props.value
    )
    page.value = Math.floor(iconIndex / pageSize.value) + 1
  }

  onMounted(() => {
    onFeedback()
  })
</script>
