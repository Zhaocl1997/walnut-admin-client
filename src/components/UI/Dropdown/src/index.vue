<!-- TODO -->
<template>
  <el-dropdown v-bind="getBindValue" @command="onCommand">
    <slot></slot>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item[optionValue]"
          :command="item[optionValue]"
          :disabled="item.disabled"
          :divided="item.divided"
          :icon="item.icon"
          :class="calcClass(item[optionValue])"
        >
          <span v-if="!item.slot">{{ item[optionLabel] }}</span>
          <template v-else>
            <slot :name="item[optionValue]" :prop="item[optionLabel]"></slot>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
  import type { WDropdownProps } from './types'
  import { defineComponent, computed } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WDropdown',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'command'],

    setup(props: WDropdownProps, ctx) {
      const { attrs, emit } = ctx

      const calcClass = (val: BaseDataType) => {
        return [
          {
            'w-highlight': props.modelValue === val,
          },
        ]
      }

      const onCommand = (val: BaseDataType) => {
        emit('update:modelValue', val)
        emit('command', val)
      }

      const getBindValue = computed(() => {
        return { ...attrs, ...easyOmit(props, extendPropKeys) }
      })

      return {
        getBindValue,
        calcClass,
        onCommand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
