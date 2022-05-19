<template>
  <div :id="chartId" :style="{ width, height }"></div>
</template>

<script lang="ts" setup>
  import type { EChartsOption, ECharts } from 'echarts'
  import { genString } from 'easy-fns-ts'

  import echarts from './resources/onDemand'

  interface WEchartsProps {
    option: EChartsOption
    height?: string
    width?: string
  }

  const appDark = useAppDarkStore()
  const appLocale = useAppLocaleStore()

  const chartId = ref('echarts-' + genString(8))
  const chartInst = ref<Nullable<ECharts>>(null)

  const props = withDefaults(defineProps<WEchartsProps>(), {
    height: '400px',
    width: '100%',
  })

  useEventListener('resize', () => {
    chartInst.value?.resize()
  })

  // TODO keep-alive error
  watchEffect(
    () => {
      if (chartInst.value) {
        chartInst.value.dispose()
        chartInst.value = null
      }

      const target = document.getElementById(chartId.value)!
      // if ondemand usage, just uncomment top echarts import, and change below to `echarts.init`
      const chart = echarts.init(target, appDark.isDark ? 'dark' : undefined, {
        locale: appLocale.locale.split('_')[0].toUpperCase(),
      })

      // @ts-ignore
      chartInst.value = chart

      chart.setOption(
        appDark.isDark
          ? Object.assign(props.option, { backgroundColor: 'transparent' })
          : props.option
      )
    },
    { flush: 'post' }
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorECharts',
  })
</script>
