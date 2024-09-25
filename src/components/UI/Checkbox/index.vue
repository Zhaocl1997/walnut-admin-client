<script lang="ts" setup>
import type { CheckboxGroupProps } from 'naive-ui'
import type { ICompUICheckboxProps } from '.'

defineOptions({
  name: 'WUICheckbox',
})

const props = withDefaults(defineProps<ICompUICheckboxProps>(), {})
const attrs: CheckboxGroupProps = useAttrs()
</script>

<template>
  <n-checkbox-group>
    <n-space>
      <n-checkbox v-for="item in options" :key="item.value" v-bind="item">
        {{ item.label }}
      </n-checkbox>
    </n-space>
  </n-checkbox-group>
</template>
