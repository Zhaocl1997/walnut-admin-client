<script lang="tsx" setup>
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

const ButtonText = () => props.textProp && (typeof props.textProp === 'string' ? props.textProp : props.textProp())
</script>

<template>
  <n-button @click="onFinalClick">
    <template #default>
      <ButtonText v-if="textProp" />
      <slot v-else name="default" />
    </template>

    <template #icon>
      <WIcon v-if="icon" :icon="icon" />
      <slot v-else name="icon" />
    </template>
  </n-button>
</template>
