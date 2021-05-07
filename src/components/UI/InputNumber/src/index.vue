<template>
  <el-input-number ref="inputNumberRef" v-bind="getBindValue" />
</template>

<script lang="ts">
  import type { WInputNumberProps, ElInputNumberRef } from './types'
  import { defineComponent, computed, ref } from 'vue'
  import props from './props'
  import { useExpose } from '/@/hooks/core/useExpose'

  export default defineComponent({
    name: 'WInputNumber',

    inheritAttrs: false,

    props: props,

    setup(props: WInputNumberProps, ctx) {
      const inputNumberRef = ref<Nullable<ElInputNumberRef>>(null)

      const { attrs, expose } = ctx

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      useExpose({
        apis: {
          focus: () => {
            inputNumberRef.value!.input.focus()
          },
          select: () => {
            inputNumberRef.value!.input.select()
          },
        },
        expose,
      })

      return {
        inputNumberRef,
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
