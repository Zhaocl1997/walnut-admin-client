<template>
  <el-col
    v-if="item.visible === undefined || item.visible === true"
    v-bind="item.colProp || { ...item.colProp, span: span }"
  >
    <transition name="fade" mode="out-in" appear>
      <el-form-item v-bind="item.formProp">
        <template v-if="$slots[propName]">
          <slot :name="propName" />
        </template>

        <template v-else>
          <component
            :is="component"
            v-model="modelValue[propName]"
            v-bind="componentProps"
          ></component>
        </template>
      </el-form-item>
    </transition>
  </el-col>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  import { useFormContext } from '../../../hooks/useFormContext'

  import { WFormSchemaItem } from '../../../types'
  import { useFormItem } from './hooks/useFormItem'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WFormSchemaItem>,
      modelValue: Object as PropType<any>,
    },

    setup(props: any) {
      const { component, propName, componentProps } = useFormItem(props)
      const { getFormContext } = useFormContext()
      const { span } = getFormContext()

      return {
        span,
        component,
        propName,
        componentProps,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
