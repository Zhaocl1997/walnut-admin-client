<script lang="ts" setup>
import WHomeNumberCard from './components/NumberCard.vue'
import WHomeChartCard from './components/ChartCard.vue'

import { useNumberCard } from './useNumberCard'
import { useChartCard } from './useChartCard'

defineOptions({
  name: 'Homepage',
})

const { cards: numberCards, loading: numberCardLoading } = useNumberCard()
const { cards: chartCards, loading: chartCardLoading } = useChartCard()
</script>

<template>
  <div>
    <!-- number -->
    <div class="mb-2 flex flex-wrap">
      <w-transition appear name="fade-down" group>
        <div
          v-for="(item, index) in numberCards"
          :key="index"
          class="w-full rounded-2xl px-1 pt-1 transition duration-300 ease-in-out md:w-1/2 xl:w-1/3 md:pr-1"
        >
          <WHomeNumberCard
            v-bind="item"
            :loading="numberCardLoading"
          />
        </div>
      </w-transition>
    </div>

    <!-- chart -->
    <div class="flex flex-wrap">
      <w-transition appear name="fade-down" group>
        <div
          v-for="(item, index) in chartCards"
          :key="index"
          class="w-full rounded-2xl px-1 pt-1 transition duration-300 ease-in-out md:w-1/2 xl:w-1/2 md:pr-1"
        >
          <WHomeChartCard
            v-bind="item"
            :loading="chartCardLoading"
          />
        </div>
      </w-transition>
    </div>
  </div>
</template>

<style scoped>
  :deep(.w-card > .w-card-header) {
  padding: 12px 16px !important;
}

:deep(.w-h) {
  margin: 0;
}
</style>
