<script lang="ts" setup>
import type { InputNumberInst } from 'naive-ui'
import { useTableContext } from '../../../hooks/useTableContext'

defineOptions({
  name: 'WTableHeaderRightPolling',
})

const { tablePropsCtx, onApiList } = useTableContext()
const { getProps: tableProps } = tablePropsCtx

const popoverShow = ref(false)
const inputNumberRef = templateRef<InputNumberInst>('inputNumberRef')
const insidePollingTime = ref<number>()

const getPollingInterval = computed(() => insidePollingTime.value ?? tableProps.value.polling)

const getDefaultValue = computed(() => getPollingInterval.value / 1000)

const { current } = useMagicKeys()
const keys = computed(() => Array.from(current))

const { start: resume, pause, isActive, percentage, flag } = useIntervalFnWithPercent(
  getPollingInterval,
  onApiList,
)

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
  // eslint-disable-next-line regexp/no-unused-capturing-group
  if (/^\d+(\.(\d+)?)?$/.test(nums))
    return Number(nums)
  return nums === '' ? null : Number.NaN
}

function formatSeconds(value: number) {
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
          <!-- <div>
            <WIconButton
              :icon-props="{
                icon: 'ant-design:sync-outlined',
                class: { 'animate-spin': isActive },
                style: { ['animation-duration']: `${getPollingInterval}ms` },
              }"
              :button-props="{ text: true, onClick: onOpenPopover }"
            />
          </div> -->

          <div class="h-4 w-4 flex items-center justify-center -mt-1.5" @click="onOpenPopover">
            <n-progress
              v-if="flag"
              type="circle"
              status="success"
              :percentage="percentage"
              :offset-degree="180"
              :stroke-width="20"
              :show-indicator="false"
            />
          </div>
        </template>

        <template #default>
          <div class="flex flex-row flex-nowrap items-center gap-2">
            <WIconButton
              :icon-props="{ icon: isActive ? 'ant-design:pause-circle-outlined' : 'ant-design:play-circle-outlined' }"
              :button-props="{ onClick: onPollingClick }"
              tooltip
              :tooltip-msg="$t('app.base.play_pause')"
            />

            <n-input-number
              ref="inputNumberRef"
              :min="3"
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
