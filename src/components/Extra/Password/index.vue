<script lang="ts" setup>
import { checkStrStrong, statusTable } from './utils'

// TODO 888
interface InternalProps {
  value?: string
  maxlength?: number
  minlength?: number
  progress?: boolean
  capslock?: boolean
  onSubmit?: () => Promise<void>
}

const props = withDefaults(defineProps<InternalProps>(), {
  maxlength: 80,
  minlength: 8,
  progress: false,
})

const emits = defineEmits(['update:value', 'submit'])

const { t } = useAppI18n()

const percentage = ref(0)
const status = ref('success')

const tooltipShow = ref(false)
const isFocus = ref(false)
const capsLockState = useKeyModifier('CapsLock')

const onShowTooltip = () => {
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

const onUpdateValue = (val: string) => {
  emits('update:value', val)
}

const onKeyup = (e: KeyboardEvent) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter')
    emits('submit')
}

const onFocus = () => {
  isFocus.value = true
  onShowTooltip()
}

const onBlur = () => {
  isFocus.value = false
  tooltipShow.value = false
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Password',

  inheritAttrs: false,
})
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
        {{ t('comp.password.capslock') }}
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
