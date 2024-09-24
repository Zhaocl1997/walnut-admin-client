<script lang="ts" setup>
import { option1, option2, option3 } from './option'

defineOptions({
  name: 'EchartsDemo',
})
</script>

<template>
  <WDemoCard title="ECharts Demo">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar">
          Line
        </WTitle>

        <w-echarts :option="option1" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar">
          Bar
        </WTitle>

        <w-echarts :option="option2" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar">
          Pie
        </WTitle>

        <w-echarts :option="option3" />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
