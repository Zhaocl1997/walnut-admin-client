<script lang="tsx" setup>
import type { SelectProps } from 'naive-ui'
import type { RenderOption } from 'naive-ui/es/_internal/select-menu/src/interface'
import type { ICompUISelectProps } from '.'

defineOptions({
  name: 'WUISelect',
})

const props = withDefaults(defineProps<ICompUISelectProps>(), {})
const attrs: SelectProps = useAttrs()

const renderOption: RenderOption = ({ node, option, selected }) => {
  return props.tooltip
    ? (
        <n-tooltip {...props.tooltipProps}>
          {{
            default: () => attrs.renderLabel ? attrs.renderLabel(option, selected) : <span>{(option as RowData).label}</span>,
            trigger: () => node,
          }}
        </n-tooltip>
      )
    : node
}
</script>

<template>
  <n-select :render-option="renderOption">
    <template v-for="(slot, index) of Object.keys($slots)" :key="index" #[slot]>
      <slot :name="slot" />
    </template>
  </n-select>
</template>
