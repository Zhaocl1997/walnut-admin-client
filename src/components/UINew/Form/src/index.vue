<script lang="tsx">
  import type { WForm } from './types'
  import {
    ref,
    unref,
    computed,
    defineComponent,
    renderSlot,
    renderList,
  } from 'vue'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'

  import WFormItem from './components/FormItem/index.vue'
  import WFormItemExtendQuery from './components/Extend/Query.vue'
  import WFormItemExtendDivider from './components/Extend/Divider.vue'
  import WFormItemTransition from '/@/components/Help/Transition'

  import { useFormSchemas } from './hooks/useFormSchemas'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormEvents } from './hooks/useFormEvents'

  import { props } from './props'

  export default defineComponent({
    name: 'WForm',

    components: {
      WFormItem,
      WFormItemExtendQuery,
      WFormItemExtendDivider,
      WFormItemTransition,
    },

    props,

    emits: ['reset', 'query', 'hook'],

    setup(props: WForm.Props, { attrs, slots, emit, expose }) {
      const formRef = ref<Nullable<WForm.Ref.NFormRef>>(null)

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(getProps)

      const { onEvent } = useFormEvents(getProps.value)

      setFormContext({
        formRef,
        formProps: { ...unref(getProps), ...attrs },
        formSchemas,
        formEvent: onEvent,
      })

      useExpose({
        apis: {
          validate: () => formRef.value?.validate(),
          restoreValidation: () => formRef.value?.restoreValidation(),
        },
        expose,
      })

      onEvent({
        name: 'hook',
        params: {
          validate: () => formRef.value?.validate(),
          restoreValidation: () => formRef.value?.restoreValidation(),
          setProps,
        },
      })

      const renderItem = () =>
        renderList(formSchemas.value, (item, index) => {
          if (item.type === 'Extend:Query') {
            return (
              <n-gi span={4} suffix={true}>
                <w-form-item-extend-query {...item.componentProp} />
              </n-gi>
            )
          }

          if (item.type === 'Extend:Divider') {
            return (
              <n-gi span={24}>
                <w-form-item-extend-divider
                  index={index}
                  {...item.componentProp}
                />
              </n-gi>
            )
          }

          return (
            <n-gi
              {...(item?.gridProp ?? { span: getProps.value.span })}
              v-show={item.foldShow}
            >
              <w-form-item item={item}>
                {item.type === 'Base:Slot' &&
                  Object.keys(slots).includes(item.formProp?.path!) &&
                  renderSlot(slots, item.formProp?.path!)}
              </w-form-item>
            </n-gi>
          )
        })

      return () => (
        <n-form
          ref={formRef}
          {...{
            ...attrs,
            labelAlign: attrs.labelAlign ?? 'right',
            labelPlacement: attrs.labelPlacement ?? 'left',
          }}
          {...unref(getProps)}
        >
          <n-grid
            cols={unref(getProps).cols}
            xGap={unref(getProps).xGap}
            yGap={unref(getProps).yGap}
          >
            {renderItem()}
          </n-grid>
        </n-form>
      )
    },
  })
</script>

<style scoped></style>
