<script lang="ts" setup>
import type { TagProps } from 'naive-ui'

defineOptions({
  name: 'WHomeNumberCard',
  defaultView: false,
})

const props = defineProps<InternalProps>()

// TODO 888
interface InternalProps {
  title?: string
  headerExtra?: {
    text?: string
    tagProps?: TagProps
  }
  loading?: boolean

  number?: number
  icon?: string
}

const appSettings = useAppStoreSetting()

const trend = ref(0)
const showTrend = ref(true)
const isPositive = ref<boolean | undefined>()

watch(
  () => props.number,
  (newV, oldV) => {
    if (newV && oldV) {
      showTrend.value = false
      const num = +((newV - oldV) / oldV).toFixed(2)
      trend.value = Math.abs(num)
      isPositive.value = num > 0
      nextTick(() => {
        showTrend.value = true
      })
    }
  },
  {
    immediate: true,
  },
)
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
      <div v-if="loading" class="hstack justify-between">
        <n-skeleton height="42px" width="60%" round />
        <n-skeleton height="42px" circle />
      </div>

      <div v-else class="relative text-3xl">
        <div class="hstack items-center">
          <n-number-animation
            :from="0"
            :to="number"
            show-separator
            :duration="appSettings.app.reducedMotion ? 0 : 3000"
          />

          <w-transition appear name="slide-up">
            <n-tag
              v-show="isPositive !== undefined && showTrend"
              class="ml-2"
              round
              size="small"
              :type="isPositive ? 'success' : 'error'"
            >
              <div class="hstack items-center gap-x-1">
                <span>
                  <span class="mr-1">{{ isPositive ? '+' : '-' }}</span>
                  <span>{{ trend }} %</span>
                </span>

                <w-icon
                  :icon="
                    isPositive
                      ? 'ant-design:arrow-up-outlined'
                      : 'ant-design:arrow-down-outlined'
                  "
                />
              </div>
            </n-tag>
          </w-transition>
        </div>

        <w-transition appear name="slide-right">
          <w-icon
            height="48"
            :icon="icon"
            class="absolute right-0 cursor-pointer transition-all -top-1.5 hover:scale-110"
          />
        </w-transition>
      </div>
    </template>
  </n-card>
</template>
