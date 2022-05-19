<template>
  <div>
    <!-- number -->
    <div class="flex flex-wrap mb-2">
      <w-transition appear name="fade-down" group>
        <div
          v-for="(item, index) in numberCards"
          :key="index"
          class="w-full md:w-1/2 xl:w-1/3 pt-1 px-1 md:pr-1 rounded-2xl transition duration-300 ease-in-out"
        >
          <WHomeNumberCard v-bind="item" :loading="numberCardLoading" />
        </div>
      </w-transition>
    </div>

    <!-- chart -->
    <div class="flex flex-wrap">
      <w-transition appear name="fade-down" group>
        <div
          v-for="(item, index) in chartCards"
          :key="index"
          class="w-full md:w-1/2 xl:w-1/2 pt-1 px-1 md:pr-1 rounded-2xl transition duration-300 ease-in-out"
        >
          <WHomeChartCard v-bind="item" :loading="chartCardLoading" />
        </div>
      </w-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import WHomeNumberCard from './components/NumberCard.vue'
  import WHomeChartCard from './components/ChartCard.vue'

  import { useNumberCard } from './useNumberCard'
  import { useChartCard } from './useChartCard'

  const { cards: numberCards, loading: numberCardLoading } = useNumberCard()
  const { cards: chartCards, loading: chartCardLoading } = useChartCard()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',
  })
</script>

<style scoped>
  :deep(.w-card > .w-card-header) {
    padding: 12px 16px !important;
  }

  :deep(.w-h) {
    margin: 0;
  }
</style>
