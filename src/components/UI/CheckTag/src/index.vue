<template>
  <el-space size="mini">
    <el-check-tag
      v-for="(item, index) in wOptions"
      :checked="item.checked"
      :disabled="item.disabled"
      @click="onClick(item, index)"
    >
      <div class="whitespace-nowrap">{{ item.label }}</div>
    </el-check-tag>
  </el-space>
</template>

<script lang="ts">
  import type { WCheckTagProps, WCheckTagOptionItemType } from './types'
  import { defineComponent, ref, watchEffect, watch, unref } from 'vue'
  import { findAllIndex } from 'easy-fns-ts'
  import props from './props'

  export default defineComponent({
    name: 'WCheckTag',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue'],

    setup(props: WCheckTagProps, ctx) {
      const { emit } = ctx

      const wOptions = ref<WCheckTagOptionItemType[]>([])

      const onClick = (item: WCheckTagOptionItemType, index: IndexType) => {
        if (item.disabled) {
          return
        }

        if (!props.multiple) {
          const checkedIndex = wOptions.value.findIndex((item) => item.checked)

          if (checkedIndex !== -1) {
            wOptions.value[checkedIndex].checked = false
          }
        }

        wOptions.value[index].checked = !wOptions.value[index].checked
      }

      watchEffect(() => {
        // @ts-ignore
        wOptions.value = props.options!.map((item) => ({
          ...item,
          checked: false,
        }))
      })

      watchEffect(() => {
        if (!props.multiple) {
          const index = wOptions.value.findIndex(
            (item) => item[props.optionValue as string] === props.modelValue
          )
          if (index !== -1) {
            wOptions.value[index].checked = true
          }
        } else {
          const allIndex = findAllIndex(wOptions.value, (item) => {
            return (props.modelValue as any[]).includes(
              item[props.optionValue as string]
            )
          })
          if (allIndex.length !== 0) {
            allIndex.forEach((i) => {
              wOptions.value[i].checked = true
            })
          }
        }
      })

      watch(
        () => unref(wOptions),
        (n) => {
          if (!props.multiple) {
            const val = n.find((item) => item.checked)
            emit('update:modelValue', val![props.optionValue as string])
          } else {
            const val = n.filter((item) => item.checked)
            emit(
              'update:modelValue',
              val.map((i) => i[props.optionValue as string])
            )
          }
        },
        {
          deep: true,
        }
      )

      return {
        wOptions,
        onClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-check-tag[disabled] {
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .el-check-tag[disabled]:hover {
    background-color: #f5f7fa;
  }

  .el-check-tag[disabled].is-checked:hover {
    background-color: #deedfc;
  }
</style>
