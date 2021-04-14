<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter">
      <template v-for="(item, index) in formSchemas" :key="index">
        <WFormItem :model-value="modelValue" :item="item">
          <template
            #[slotName]="data"
            v-for="(slotName, slotIndex) in Object.keys($slots)"
            :key="slotIndex"
          >
            <slot :name="slotName" v-bind="data"></slot>
          </template>
        </WFormItem>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WFormProps } from './types'

  import { ref, unref, computed, defineComponent } from 'vue'

  import props from './props'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useFormContext } from './hooks/useFormContext'
  import { useFormProps } from './hooks/useFormProps'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormMethods } from './hooks/useFormMethods'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'hook'],

    setup(props: WFormProps, ctx: SetupContext) {
      const { attrs, emit, expose } = ctx

      const formRef = ref<Nullable<any>>(null)

      const { setFormContext } = useFormContext()

      const { setProps, getProps } = useFormProps(props)

      const { formSchemas, onItemVisible } = useFormSchemas(getProps)

      useFormComponents(getProps)

      const { formMethods } = useFormMethods(formRef, { setProps })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // unref the computed props and bind to el-form
          ...unref(getProps),
          // used for method like `valdiate` to work
          model: unref(getProps).modelValue,
        }
      })

      // create `WForm` context
      setFormContext(getProps)

      // create `useForm` hook
      emit('hook', formMethods)

      // expose
      useExpose({
        apis: formMethods,
        expose,
      })

      return {
        formRef,
        getBindValue,

        formSchemas,
        onItemVisible,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
