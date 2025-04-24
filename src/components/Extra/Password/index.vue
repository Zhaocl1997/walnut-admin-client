<script lang="ts" setup>
import type { ProgressStatus } from 'naive-ui'
import type { ICompExtraPasswordProps } from '.'
import { checkStrStrong, statusTable } from './utils'

defineOptions({
  name: 'WCompExtraPasswordInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ICompExtraPasswordProps>(), {
  maxlength: 80,
  minlength: 8,
  progress: false,
  capslock: false,
})

const emits = defineEmits<{ submit: [] }>()

const value = defineModel<MaybeNullOrUndefined<string>>('value', { required: true })

const percentage = ref(0)
const status = ref<ProgressStatus>('success')

watch(
  () => value.value,
  (val) => {
    if (!props.progress) {
      return
    }
    const strong: number = checkStrStrong(val!)

    status.value = statusTable[strong]
    percentage.value = strong * 20
  },
  { immediate: true },
)

function onKeyup(e: KeyboardEvent) {
  if (e.code === 'Enter' || e.code === 'NumpadEnter')
    emits('submit')
}
</script>

<template>
  <div class="w-full">
    <WCapsLockTooltip :lock="capslock">
      <template #default="{ onTargetBlur, onTargetFocus }">
        <n-input
          v-model:value="value"
          type="password"
          show-password-on="click"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          clearable
          :input-props="{
            autocomplete: 'current-password',
          }"
          @keyup="onKeyup"
          @focus="onTargetFocus"
          @blur="onTargetBlur"
        />
      </template>
    </WCapsLockTooltip>

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
