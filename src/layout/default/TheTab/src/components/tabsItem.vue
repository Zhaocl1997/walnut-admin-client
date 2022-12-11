<template>
  <div
    ref="tabsItem"
    :style="{
      width: getShowTite ? `${appSetting.tabs.itemWidth}px` : 'max-content',
    }"
    :class="[
      'relative h-full grid grid-cols-12 gap-1 items-center cursor-pointer select-none px-2 py-1',
      {
        'grid-cols-2': !getShowTite,
      },
    ]"
  >
    <w-icon
      v-if="getShowAffixedPinIcon"
      height="16"
      icon="ant-design:pushpin-filled"
      class="col-span-2 flex items-center"
    ></w-icon>

    <div
      v-else-if="getShowDot"
      :class="[
        'bg-info text-xl font-bold border-8 border-info shadow-xl rounded-full h-4 w-4 hover:border-infoHover col-span-2 flex items-center',
        { 'animate-bounce': getHovered },
      ]"
    ></div>

    <w-icon
      v-if="getShowIcon"
      :icon="item.meta._icon ?? item.meta.icon"
      height="16"
      :class="[
        'col-span-2 flex items-center',
        { 'animate-bounce': item.meta._icon_animate },
        { 'animate-duration-1000': item.meta._icon_animate_duration === 1000 },
        { 'animate-duration-2000': item.meta._icon_animate_duration === 2000 },
        { 'animate-duration-3000': item.meta._icon_animate_duration === 3000 },
        { 'animate-duration-4000': item.meta._icon_animate_duration === 4000 },
      ]"
    ></w-icon>

    <w-transition appear name="fade-left" :duration="100">
      <w-text-scroll
        v-if="getShowTite"
        :class="[
          'col-span-10 text-sm whitespace-nowrap truncate',
          { 'pr-4': getHovered },
        ]"
        :title="getTitle"
        :maxLength="item.meta._title_maxLength ?? 12"
        :speed="item.meta._title_speed"
      >
        {{ getTitle }}
      </w-text-scroll>
    </w-transition>

    <w-transition appear name="fade-right">
      <w-icon
        v-if="getShowCloseIcon"
        icon="ant-design:close-outlined"
        height="16"
        class="absolute right-1 hover:(text-error transform scale-125 rounded-full)"
        @click.prevent.stop="onTabRemove(item.name)"
      ></w-icon>
    </w-transition>
  </div>
</template>

<script lang="ts" setup>
  import { getTabsContext } from '../hooks/useTabsContext'

  const props = defineProps<{ item: AppTab; index: number }>()

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()

  const appSetting = useAppStoreSetting()
  const appAdapter = useAppStoreAdapter()

  const tabsItem = ref()
  const isHovered = useElementHover(tabsItem)
  const getHovered = computed(() => isHovered.value || props.item.meta._hovered)

  const { onTabRemove } = getTabsContext()

  // only show when not mobile
  // and
  // only show when tab affixed
  // and
  // pnly show when affix mode is pin
  const getShowAffixedPinIcon = computed(
    () =>
      !appAdapter.isMobile &&
      props.item.meta.affix &&
      appSetting.tabs.affixMode === AppConstTabAffixMode.PIN
  )

  // only show when tab not affixed and showIcon is true
  // or
  // only show when tab is affixed and affix mode is icon
  const getShowIcon = computed(
    () =>
      (!props.item.meta.affix && appSetting.tabs.showIcon) ||
      (props.item.meta.affix &&
        appSetting.tabs.affixMode === AppConstTabAffixMode.ICON)
  )

  // only show when not mobile
  // and
  // only show when tab not affixed
  // and
  // only show when showIcon is true
  // and
  // current tab
  const getShowDot = computed(
    () =>
      !appAdapter.isMobile &&
      !props.item.meta.affix &&
      !appSetting.tabs.showIcon &&
      currentRoute.value.name === props.item.name
  )

  // only show when tab is not affixed
  // and
  // tab close mode is always or when close mode is hover and is hovered
  const getShowCloseIcon = computed(
    () =>
      !props.item.meta.affix &&
      (appSetting.tabs.closeMode === AppConstTabCloseMode.ALWAYS ||
        (appSetting.tabs.closeMode === AppConstTabCloseMode.HOVER &&
          getHovered.value))
  )

  // only show when tab is not affixed
  // or
  // tab is affixed and affix mode is pin
  const getShowTite = computed(
    () =>
      !props.item.meta.affix ||
      (props.item.meta.affix &&
        appSetting.tabs.affixMode === AppConstTabAffixMode.PIN)
  )

  // scroll title and real title
  const getTitle = computed(() =>
    t(props.item.meta._title! ?? props.item.meta.title!)
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TabsItem',
  })
</script>
