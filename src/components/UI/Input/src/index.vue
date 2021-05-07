<template>
  <el-input v-bind="getBindValue">
    <template v-if="$slots.prepend || prepend" #prepend>
      <span v-if="prepend">{{ prepend }}</span>
      <span v-else><slot name="prepend" /></span>
    </template>

    <template v-if="$slots.append || append" #append>
      <span v-if="append">{{ append }}</span>
      <span v-else><slot name="append" /></span>
    </template>

    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>

    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>

    <template v-if="helpMessage" #[helpPosition]>
      <el-tooltip effect="dark" :content="helpMessage" placement="top">
        <i class="el-icon-question"></i>
      </el-tooltip>
    </template>
  </el-input>
</template>

<script lang="ts">
  import type { ElInputRef, WInputProps } from './types'
  import { computed, defineComponent, ref } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'

  import props, { extendPropKeys } from './props'
  import { useInputMethods } from './hooks/useInputMethods'
  import { useInputSearch } from './hooks/useInputSearch'
  import { useInputModifiers } from './hooks/useInputModifiers'
  import { useInputLegal } from './hooks/useInputLegal'

  export default defineComponent({
    name: 'WInput',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'input', 'change', 'clear', 'search'],

    setup(props: WInputProps, ctx) {
      const { attrs, emit, expose } = ctx
      const inputRef = ref<Nullable<ElInputRef>>(null)

      const { inputMethods } = useInputMethods(inputRef)
      const { emitSearch } = useInputSearch(props, emit)
      const { modifiedValue } = useInputModifiers(props)
      const { legalizedValue } = useInputLegal(props)

      const onInput = (value: string) => {
        value = modifiedValue(value)

        value = legalizedValue(value)

        emit('update:modelValue', value)
        emit('input', value)
        emitSearch()
      }

      const onClear = () => {
        emit('update:modelValue', '')
        emit('change', '')
        emit('clear')
      }

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...easyOmit(props, extendPropKeys),
          onInput,
          onClear,
          ref: inputRef,
        }
      })

      useExpose({
        apis: inputMethods,
        expose: expose,
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
