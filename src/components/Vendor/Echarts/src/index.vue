<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { genString } from 'easy-fns-ts'

// TODO 888
interface WEchartsProps {
  option: EChartsOption
  height?: string
  width?: string
}

const props = withDefaults(defineProps<WEchartsProps>(), {
  height: '400px',
  width: '100%',
})
const chartId = ref(`echarts-${genString(8)}`)
// third party libs should use shallowRef !!!
const chartInst = shallowRef<Nullable<echarts.ECharts>>(null)

const appDark = useAppStoreDark()
const appLocale = useAppStoreLocale()
const appSettings = useAppStoreSetting()

const getSkinName = computed(() => (appDark.isDark ? 'dark' : undefined))

const getLangName = computed(() =>
  appLocale.locale.split('_')[0].toUpperCase(),
)

useEventListener('resize', () => {
  chartInst.value?.resize()
})

const onDispose = () => {
  if (chartInst.value) {
    chartInst.value.dispose()
    chartInst.value = null
  }
}

const onInit = () => {
  onDispose()

  const target = document.getElementById(chartId.value)!

  if (!target)
    return

  // if ondemand usage, just uncomment top echarts import, and change below to `echarts.init`
  const chart = echarts.init(target, getSkinName.value, {
    locale: getLangName.value,
  })

  chartInst.value = chart

  chartInst.value!.setOption(
    appDark.isDark
      ? Object.assign(props.option, {
        backgroundColor: 'transparent',
        animation: !appSettings.app.reducedMotion,
      })
      : Object.assign(props.option, {
        animation: !appSettings.app.reducedMotion,
      }),
  )
}

watch(() => [getSkinName, getLangName, props.option], onInit, {
  deep: true,
  flush: 'post',
})

tryOnMounted(onInit)

tryOnUnmounted(onDispose)

onActivated(onInit)

onDeactivated(onDispose)
</script>

<script lang="ts">
export default defineComponent({
  name: 'WVendorECharts',
})
</script>

<template>
  <div :id="chartId" :style="{ width, height }" />
</template>
