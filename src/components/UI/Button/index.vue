<script lang="ts" setup>
import type { ICompUIButtonProps } from '.'

defineOptions({
  name: 'WButton',
})

const props = withDefaults(defineProps<ICompUIButtonProps>(), {
  debounce: 100,
})

const emits = defineEmits<{ click: [e: MouseEvent] }>()

function onClick(e: MouseEvent) {
  emits('click', e)
}

const debounceClick = useDebounceFn(onClick, props.debounce)

const onFinalClick = (e: MouseEvent) => props.debounce ? debounceClick(e) : onClick(e)
</script>

<template>
  <n-button @click="onFinalClick">
    <template #default>
      <span v-if="textProp">{{ textProp }}</span>
      <slot v-else name="default" />
    </template>

    <template #icon>
      <WIcon v-if="icon" :icon="icon" />
      <slot v-else name="icon" />
    </template>
  </n-button>
</template>
