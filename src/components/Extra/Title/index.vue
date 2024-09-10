<script lang="ts" setup>
import type { ICompExtraTitleProps } from '.'

defineOptions({
  name: 'WTitle',
})

defineProps<ICompExtraTitleProps>()
</script>

<template>
  <n-h4 class="m-0 hstack items-center">
    <span class="mr-1"><slot /></span>
    <WMessage v-if="helpMessage" :msg="helpMessage" />
  </n-h4>
</template>
