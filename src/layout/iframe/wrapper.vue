<script lang="tsx" setup>
import WTransition from '@/components/Extra/Transition'
import WIFrame from './index.vue'

defineOptions({
  name: 'TheIFrameWrapper',
})

const [DefineIframe, ReuseIframe] = createReusableTemplate<{ item: IAppTabIframe }>()

const appSetting = useAppStoreSetting()
const appTab = useAppStoreTab()

const getIframeList = computed(() =>
  appTab.iframeList.filter(e =>
    appTab.tabs.some(tab => tab.name === e.name),
  ),
)

const TransitionWrapper = defineComponent({
  props: {
    item: { type: Object as PropType<IAppTabIframe>, required: true },
  },
  setup(props) {
    return () => appSetting.getTransition
      ? (
          <WTransition
            transition-name={appSetting.getTransition}
            mode="out-in"
            appear
          >
            <ReuseIframe item={props.item} />
          </WTransition>
        )
      : <ReuseIframe item={props.item} />
  },
})
</script>

<template>
  <DefineIframe v-slot="{ item }">
    <WIFrame
      v-show="item.cache ? item.name === $route.name : true"
      v-if="!item.cache ? item.name === $route.name : true"
      :key="item.cache ? `cache_${item.name}` : item.name"
      :frame-src="item.url"
    />
  </DefineIframe>

  <template v-for="item in getIframeList" :key="item.name">
    <TransitionWrapper :item="item" />
  </template>
</template>
