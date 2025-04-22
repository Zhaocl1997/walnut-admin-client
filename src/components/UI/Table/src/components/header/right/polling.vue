<script lang="ts" setup>
import type { InputNumberInst } from 'naive-ui'
import { useTableContext } from '../../../hooks/useTableContext'

defineOptions({
  name: 'WTableHeaderRightPolling',
})

const { tableProps, onApiTableList } = useTableContext()

const popoverShow = ref(false)
const inputNumberRef = ref<InputNumberInst>()
const insidePollingTime = ref()

const getPollingInterval = computed(() => insidePollingTime.value ?? tableProps.value.polling)

const getDefaultValue = computed(() => getPollingInterval.value / 1000)

const { current } = useMagicKeys()
const keys = computed(() => Array.from(current))

const { pause, resume, isActive } = useIntervalFn(() => {
  onApiTableList()
}, getPollingInterval, { immediate: true })

function onOpenPopover() {
  popoverShow.value = true
  nextTick(() => {
    inputNumberRef.value?.focus()
  })
}

watch(keys, (v) => {
  if (v.includes('f8')) {
    if (isActive.value)
      pause()
    else
      resume()
  }
})

function onPollingClick() {
  if (isActive.value) {
    pause()
    nextTick(() => {
      inputNumberRef.value?.focus()
    })
  }
  else {
    resume()
  }
}

function onUpdatePolling(v: number) {
  insidePollingTime.value = v * 1000
}

function parseSeconds(input: string) {
  const nums = input.replace(/([,s\s])/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums))
    return Number(nums)
  return nums === '' ? null : Number.NaN
}

function formatSeconds(value: number | null) {
  if (value === null)
    return ''
  return `${value} s`
}
</script>

<template>
  <n-tooltip trigger="hover">
    {{ $t('table.base.polling') }} (F8)
    <template #trigger>
      <n-popover v-model:show="popoverShow" placement="bottom" trigger="manual" @clickoutside="popoverShow = false">
        <template #trigger>
          <WIconButton
            :class="{ 'animate-spin': isActive }"
            :style="{ ['animation-duration']: `${getPollingInterval}ms` }"
            :icon-props="{ icon: 'ant-design:sync-outlined' }"
            :button-props="{ text: true }"
            @click="onOpenPopover"
          />
        </template>

        <template #default>
          <div class="flex flex-row flex-nowrap items-center gap-2">
            <WIconButton
              :icon-props="{ icon: isActive ? 'ant-design:pause-circle-outlined' : 'ant-design:play-circle-outlined' }"
              tooltip
              :tooltip-msg="$t('app.base.play_pause')"
              @click="onPollingClick"
            />

            <n-input-number
              ref="inputNumberRef"
              :min="1"
              :default-value="getDefaultValue"
              :parse="parseSeconds"
              :format="formatSeconds"
              style="width: 40px;"
              size="tiny"
              :show-button="false"
              @update:value="onUpdatePolling"
            />
          </div>
        </template>
      </n-popover>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped></style>
