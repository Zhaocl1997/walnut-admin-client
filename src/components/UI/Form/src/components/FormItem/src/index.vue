<template>
  <el-col v-if="calcVisible(item)" v-bind="calcColProp">
    <transition name="fade" mode="out-in" appear>
      <el-form-item v-bind="item.formProp">
        <template v-if="$slots[propName]">
          <slot :name="propName" v-bind="formProps" />
        </template>

        <template v-else>
          <component
            :is="component"
            v-model="formProps.modelValue[propName]"
            v-bind="componentProps"
          ></component>
        </template>
      </el-form-item>
    </transition>
  </el-col>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed } from 'vue'

  import { useFormContext } from '../../../hooks/useFormContext'

  import { WFormItemProp, WFormSchemaItem } from '../../../types'
  import { useFormItem } from './hooks/useFormItem'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WFormSchemaItem>,
    },

    // @ts-ignore
    setup(props: WFormItemProp) {
      const { formProps } = useFormContext()

      const { component, propName, componentProps, calcVisible } = useFormItem(
        props,
        useFormContext()
      )

      const calcColProp = computed(
        () => props.item.colProp ?? { span: formProps.value.span }
      )

      return {
        formProps,

        component,
        propName,
        componentProps,
        calcVisible,
        calcColProp,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
