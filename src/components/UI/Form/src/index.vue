<script lang="tsx">
  import type { SetupContext } from 'vue'
  import type {
    ElFormMethods,
    WFormMethods,
    WFormProps,
    WFormSchemaItem,
  } from './types'

  import { ref, unref, computed, defineComponent, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormMethods } from './hooks/useFormMethods'

  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'hook'],

    setup(props: WFormProps, ctx: SetupContext) {
      const { attrs, emit, expose, slots } = ctx

      const formRef = ref<Nullable<ElFormMethods>>(null)

      const { setProps, getProps } = useProps<WFormProps>(props)

      const { formSchemas } = useFormSchemas(getProps)

      useFormComponents()

      const { formMethods } = useFormMethods(formRef, { setProps })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // only use original el-form attrs, no custom props
          // otherwise you'll see a lot of prop through the `Elements` tabs on chrome devtools
          ...easyOmit(unref(getProps), extendPropKeys),
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

      // render slot type component's slot
      const renderItemSlot = (item: WFormSchemaItem) => {
        return (
          Object.keys(slots).includes(item.formProp?.prop!) &&
          renderSlot(slots, item.formProp?.prop!)
        )
      }

      // render Items
      const renderItems = () =>
        formSchemas.value.map((item) => (
          <w-form-item item={item}>{renderItemSlot(item)}</w-form-item>
        ))

      // render el-col wrap
      const renderColWrap = () =>
        getProps.value.inline
          ? renderItems()
          : () => <el-row gutter={props.gutter}> {renderItems()} </el-row>

      return () => {
        return (
          <el-form ref={formRef} {...getBindValue.value}>
            {renderColWrap()}
          </el-form>
        )
      }
    },
  })
</script>
