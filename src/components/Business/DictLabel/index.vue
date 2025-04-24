<script lang="ts" setup>
import type { ICompBusinessDictLabelProps } from '.'

defineOptions({
  name: 'WCompBusinessDictLabel',
  inheritAttrs: false,
})

const { dictType, dictValue } = withDefaults(defineProps<ICompBusinessDictLabelProps>(), {})

const target = computed(() => getDictTarget(dictType, dictValue))
</script>

<template>
  <template v-if="target">
    <n-tag v-if="target.tagType" :type="target.tagType">
      {{ $t(target.label!) }}
    </n-tag>
    <span v-else>{{ $t(target.label!) }}</span>
  </template>
  <template v-else>
    Dict Label Error
  </template>
</template>
