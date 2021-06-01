<script lang="tsx">
  import type { WForm } from './types'

  import { ref, unref, computed, defineComponent, renderSlot } from 'vue'
  import { easyOmit, getRandomInt } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormMethods } from './hooks/useFormMethods'

  import props, { extendPropKeys } from './props'

  // TODO
  // 1. disabled support for callback
  // 2. multiple item
  // 3. nested prop
  // 4. label help tooltip, also callback
  // 5. divider refactor(×)
  // 6. item Transition optimise

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'hook'],

    setup(props: WForm.Props, ctx) {
      const { attrs, emit, expose, slots } = ctx

      const formRef = ref<Nullable<WForm.ElForm.Methods>>(null)

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(getProps)

      useFormComponents()

      const { formMethods } = useFormMethods(formRef, { setProps })

      const getBindValue = computed(() => ({
        ...attrs,
        // only use original el-form attrs, no custom props
        // otherwise you'll see a lot of prop through the `Elements` tabs on chrome devtools
        ...easyOmit(unref(getProps), extendPropKeys),
        // used for method like `valdiate` to work
        model: unref(getProps).modelValue,
      }))

      // create `WForm` context
      setFormContext({
        formProps: getProps,
        formSchemas: formSchemas,
      })

      // create `useForm` hook
      emit('hook', formMethods)

      // expose API through ref
      useExpose({
        apis: formMethods,
        expose,
      })

      // render slot type component's slot
      const renderItemSlot = (item: WForm.Schema.Item) =>
        Object.keys(slots).includes(item.formProp?.prop!) &&
        renderSlot(slots, item.formProp?.prop!)

      // render Items
      const renderItems = () =>
        formSchemas.value.map((item, index) => {
          const formItem = (i: WForm.Schema.Item, index: number) => (
            <w-form-item item={i} key={index}>
              {renderItemSlot(i)}
            </w-form-item>
          )

          // handle divider
          if (item.type === 'Divider') {
            const childrenItems = () =>
              item.componentProp?.children?.map((child, index) =>
                formItem(child, index)
              )

            return (
              <>
                <w-form-item-extend-divider item={item} index={index} />
                <w-form-transition-group group>
                  {childrenItems()}
                </w-form-transition-group>
              </>
            )
          }

          return formItem(item, getRandomInt(10, 100))
        })

      // render el-col wrap
      const renderColWrap = () =>
        getProps.value.inline
          ? renderItems()
          : () => <el-row gutter={props.gutter}> {renderItems()} </el-row>

      return () => (
        <el-form ref={formRef} {...getBindValue.value}>
          {renderColWrap()}
        </el-form>
      )
    },
  })
</script>
