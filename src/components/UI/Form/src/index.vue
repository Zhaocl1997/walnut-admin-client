<template>
  <el-form ref="formRef" v-bind="getBindValue">
    <el-row :gutter="gutter">
      <template v-for="(item, index) in formSchemas" :key="index">
        <w-form-item :item="item">
          <template
            #[slotName]="data"
            v-for="(slotName, slotIndex) in Object.keys($slots)"
            :key="slotIndex"
          >
            <slot :name="slotName" v-bind="data"></slot>
          </template>
        </w-form-item>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { ElFormMethods, WFormMethods, WFormProps } from './types'

  import { ref, unref, computed, defineComponent } from 'vue'

  import props from './props'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormMethods } from './hooks/useFormMethods'
  import { useProps } from '/@/hooks/core/useProps'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'hook'],

    setup(props: WFormProps, ctx: SetupContext) {
      const { attrs, emit, expose } = ctx

      const formRef = ref<Nullable<ElFormMethods>>(null)

      const { setProps, getProps } = useProps<WFormProps>(props)

      const { formSchemas } = useFormSchemas(getProps)

      useFormComponents()

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
      setFormContext({
        formProps: getProps,
      })

      // create `useForm` hook
      emit('hook', formMethods)

      // expose API through ref
      useExpose<WFormMethods>({
        apis: formMethods,
        expose,
      })

      return {
        formRef,
        getBindValue,

        formSchemas,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
