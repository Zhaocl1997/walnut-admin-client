<script lang="ts" setup>
import type { ICompUIInputProps } from '.'
import { clearIllegalChars, upperFirst } from 'easy-fns-ts'

defineOptions({
  name: 'WCompUIInput',
})

const props = withDefaults(defineProps<ICompUIInputProps>(), {})

const inputValue = defineModel<string>('value')

function onCopy(e: MouseEvent) {
  e.stopPropagation()
}

function onInputValue(val: string) {
  if (!props.pair) {
    props.blackList?.length && (val = clearIllegalChars(val, props.blackList!))
    props.valueModifiers?.trim && (val = val.trim())
    props.valueModifiers?.capitalize && (val = upperFirst(val))
    props.valueModifiers?.uppercase && (val = val.toLocaleUpperCase())
  }
  inputValue.value = val
}

defineExpose({})
</script>

<template>
  <n-input v-model:value="inputValue" @update:value="onInputValue">
    <template #prefix>
      <div v-if="prefix">
        {{ prefix }}
      </div>
      <WIcon v-else-if="prefixIcon" :icon="prefixIcon" />
      <slot v-else name="prefix" />
    </template>

    <template #suffix>
      <div v-if="suffix">
        {{ suffix }}
      </div>
      <WIcon v-else-if="suffixIcon" :icon="suffixIcon" />
      <WCopy v-else-if="copiable" icon :source="inputValue" @click="onCopy" />
      <WMessage v-else-if="helpMessage" :msg="helpMessage" />
      <slot v-else name="suffix" />
    </template>
  </n-input>
</template>
