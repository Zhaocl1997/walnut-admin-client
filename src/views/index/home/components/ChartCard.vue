<script lang="ts" setup>
import type { WHomeChartCardProps } from './types'

defineOptions({
  name: 'WHomeChartCard',
  defaultView: false,
})

const props = defineProps<WHomeChartCardProps>()
</script>

<template>
  <n-card
    hoverable
    :segmented="{
      content: true,
    }"
  >
    <template #header>
      <n-skeleton v-if="loading" text width="20%" />

      <n-h2 v-else prefix="bar" align-text :type="headerExtra?.tagProps.type">
        <n-text>
          {{ title }}
        </n-text>
      </n-h2>
    </template>

    <template #header-extra>
      <n-skeleton v-if="loading" round width="80px" height="28px" />

      <n-tag v-else v-bind="headerExtra?.tagProps">
        <n-gradient-text :type="headerExtra?.tagProps.type">
          {{ headerExtra.text }}
        </n-gradient-text>
      </n-tag>
    </template>

    <template #default>
      <n-skeleton
        v-if="loading"
        width="100%"
        height="44vh"
        :sharp="false"
      />

      <WECharts v-else :option="option" />
    </template>
  </n-card>
</template>
