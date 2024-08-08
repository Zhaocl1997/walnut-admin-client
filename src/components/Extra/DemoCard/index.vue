<script lang="ts" setup>
import type { ICompExtraDemoCardPropsPartial } from '.'

defineOptions({
  name: 'WDemoCard',
})

defineProps<ICompExtraDemoCardPropsPartial>()
</script>

<template>
  <div>
    <w-card header-preset="collapse">
      <template #header>
        <w-title :help-message="description">
          {{ title }}
        </w-title>
      </template>
      <template #default>
        <slot />
      </template>
    </w-card>
  </div>
</template>
