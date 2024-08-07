<script lang="ts" setup>
import { checkStrStrong, statusTable } from './utils'

defineOptions({
  name: 'PasswordInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InternalProps>(), {
  maxlength: 80,
  minlength: 8,
  progress: false,
})

const emits = defineEmits(['update:value', 'submit'])

// TODO 888
interface InternalProps {
  value?: string
  maxlength?: number
  minlength?: number
  progress?: boolean
  capslock?: boolean
  onSubmit?: () => Promise<void>
}

const percentage = ref(0)
const status = ref('success')

const tooltipShow = ref(false)
const isFocus = ref(false)
const capsLockState = useKeyModifier('CapsLock')

function onShowTooltip() {
  if (!isFocus.value)
    return

  if (capsLockState.value)
    tooltipShow.value = true
  else
    tooltipShow.value = false
}

watchEffect(onShowTooltip)

watch(
  () => props.value,
  (val) => {
    if (!props.progress)
      return
    const strong = checkStrStrong(val!)

    status.value = statusTable[strong]
    percentage.value = strong * 20
  },
  { immediate: true },
)

function onUpdateValue(val: string) {
  emits('update:value', val)
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === 'Enter' || e.code === 'NumpadEnter')
    emits('submit')
}

function onFocus() {
  isFocus.value = true
  onShowTooltip()
}

function onBlur() {
  isFocus.value = false
  tooltipShow.value = false
}
</script>

<template>
  <div class="w-full">
    <n-tooltip v-model:show="tooltipShow" trigger="manual" placement="right">
      <template #trigger>
        <n-input
          :value="value"
          type="password"
          show-password-on="click"
          :placeholder="$attrs.placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          clearable
          :input-props="{
            autocomplete: 'current-password',
          }"
          @update:value="onUpdateValue"
          @keyup="onKeyup"
          @focus="onFocus"
          @blur="onBlur"
        />
      </template>

      <template #default>
        {{ $t('comp.password.capslock') }}
      </template>
    </n-tooltip>

    <n-progress
      v-if="progress"
      class="mt-2"
      :height="10"
      type="line"
      :percentage="percentage"
      :show-indicator="false"
      :status="status"
    />
  </div>
</template>
