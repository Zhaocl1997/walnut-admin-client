<script lang="ts" setup>
import type { ICompUISwitchPropsPartial } from './types'

defineOptions({
  name: 'WSwitch',
})

defineProps<ICompUISwitchPropsPartial>()
</script>

<template>
  <n-switch>
    <template #checked>
      {{ checkedText }}
    </template>
    <template #unchecked>
      {{ uncheckedText }}
    </template>
  </n-switch>
</template>
