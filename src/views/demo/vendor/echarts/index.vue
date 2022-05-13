<template>
  <w-demo-card title="ECharts Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Line</w-title>

        <WVendorECharts :option="option1"></WVendorECharts>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Bar</w-title>

        <WVendorECharts :option="option2"></WVendorECharts>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Pie</w-title>

        <WVendorECharts :option="option3"></WVendorECharts>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WVendorECharts from '/@/components/Vendor/echarts'

  import { option1, option2, option3 } from './option'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'EchartsDemo',
  })
</script>
