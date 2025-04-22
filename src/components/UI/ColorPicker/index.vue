<script lang="ts" setup>
import type { ICompUIColorPickerProps } from '.'

defineOptions({
  name: 'WCompUIColorPicker',
})

defineProps<ICompUIColorPickerProps>()
</script>

<template>
  <n-color-picker show-preview />
</template>
