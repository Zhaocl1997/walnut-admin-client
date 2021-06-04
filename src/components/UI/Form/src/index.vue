<script lang="tsx">
  import type { WForm } from './types'

  import { ref, unref, computed, defineComponent, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormMethods } from './hooks/useFormMethods'
  import { useFormEvents } from './hooks/useFormEvents'

  import props, { extendPropKeys } from './props'

  // TODO
  // 1. disabled support for callback
  // 2. nested prop
  // 3. label help tooltip, also callback
  // 4. divider refactor(×)
  // 5. item Transition optimise(×)
  // 6. refactor divider into form item(×)
  // 7. multiple/search/card/tab/step form

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'hook', 'query', 'reset'],

    setup(props: WForm.Props, ctx) {
      const { attrs, emit, expose, slots } = ctx

      const formRef = ref<Nullable<WForm.ElForm.Methods>>(null)

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(props, getProps)

      const { onEvent } = useFormEvents(getProps)

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
        formRef: formRef,
        formProps: getProps,
        formSchemas: formSchemas,
        formEvent: onEvent,
      })

      // create `useForm` hook
      emit('hook', formMethods)

      // expose API through ref
      useExpose({
        apis: formMethods,
        expose,
      })

      // render Items
      const renderItems = () =>
        formSchemas.value.map((item, index) => {
          // handle multiple
          // if (item.type === 'Multiple') {
          //   const childrenItems = () =>
          //     item.componentProp?.children?.map((child, index) =>
          //       formItem(child, index)
          //     )

          //   const onAdd = () => {
          //     item.componentProp?.children?.push({
          //       ...item.componentProp?.children[0],
          //       formProp: {
          //         ...item.componentProp?.children[0].formProp,
          //         prop: `${
          //           item.componentProp?.children[0].formProp?.prop
          //         }${getRandomInt(10, 100)}`,
          //       },
          //     })
          //   }

          //   const onRemove = () => {}

          //   return (
          //     <>
          //       {childrenItems()}

          //       <w-form-item
          //         item={{
          //           type: 'Button',
          //           componentProp: {
          //             text: 'Add More',
          //             icon: 'el-icon-circle-plus-outline',
          //             onClick: onAdd,
          //           },
          //         }}
          //       ></w-form-item>

          //       {/* <i
          //         class="el-icon-remove-outline text-3xl cursor-pointer"
          //         onClick={onRemove}
          //       ></i> */}
          //     </>
          //   )
          // }

          return (
            <w-form-item item={item} key={item.uid} index={index}>
              {item.type === 'Slot' &&
                Object.keys(slots).includes(item.formProp?.prop!) &&
                renderSlot(slots, item.formProp?.prop!)}
            </w-form-item>
          )
        })

      // render el-col wrap
      const renderColWrap = () =>
        getProps.value.inline
          ? renderItems()
          : () => (
              <el-row gutter={getProps.value.gutter}> {renderItems()} </el-row>
            )

      return () => (
        <>
          <el-form ref={formRef} {...getBindValue.value} class="relative">
            {renderColWrap()}
          </el-form>

          {getProps.value.query && <w-form-extend-query></w-form-extend-query>}
        </>
      )
    },
  })
</script>
