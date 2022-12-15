<script lang="ts" setup>
import { option1, option2, option3 } from './option'
</script>

<script lang="ts">
export default defineComponent({
  name: 'EchartsDemo',
})
</script>

<template>
  <w-demo-card title="ECharts Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Line
        </w-title>

        <w-echarts :option="option1" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Bar
        </w-title>

        <w-echarts :option="option2" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Pie
        </w-title>

        <w-echarts :option="option3" />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
