<template>
  <w-demo-card title="Echarts Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Line</w-title>

        <WECharts :option="option1"></WECharts>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Bar</w-title>

        <WECharts :option="option2"></WECharts>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Pie</w-title>

        <WECharts :option="option3"></WECharts>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WECharts from '/@/components/Vendor/echarts'

  import { option1, option2, option3 } from './option'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'EchartsDemo',
  })
</script>
