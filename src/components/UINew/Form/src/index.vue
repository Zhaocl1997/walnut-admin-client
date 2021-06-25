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

  import WFormItem from './components/FormItem/index.vue'
  import { useFormSchemas } from './hooks/useFormSchemas'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormEvents } from './hooks/useFormEvents'

  import { props } from './props'

  export default defineComponent({
    name: 'WForm',

    components: { WFormItem },

    props,

    emits: ['reset', 'query'],

    setup(props: WForm.Props, { attrs, slots, emit, expose }) {
      const formRef = ref<Nullable<WForm.FormRef>>(null)

      const { formSchemas } = useFormSchemas(props)

      const { onEvent } = useFormEvents(props)

      setFormContext({
        formRef,
        formProps: { ...props, ...attrs },
        formSchemas: formSchemas.value,
        formEvent: onEvent,
      })

      const renderItem = () =>
        renderList(formSchemas.value, (item) => (
          <n-gi
            {...(item.type === 'Extend:Query'
              ? { span: 4 }
              : item?.gridProp ?? { span: props.span })}
            suffix={item.type === 'Extend:Query'}
          >
            <w-form-item item={item}>
              {item.type === 'Extend:Slot' &&
                Object.keys(slots).includes(item.formProp?.path!) &&
                renderSlot(slots, item.formProp?.path!)}
            </w-form-item>
          </n-gi>
        ))

      useExpose({
        apis: {
          validate: () => formRef.value?.validate(),
          restoreValidation: () => formRef.value?.restoreValidation(),
        },
        expose,
      })

      return () => (
        <n-form
          ref={formRef}
          {...{
            ...attrs,
            labelAlign: attrs.labelAlign ?? 'right',
            labelPlacement: attrs.labelPlacement ?? 'left',
          }}
        >
          <n-grid cols={props.cols} xGap={props.xGap} yGap={props.yGap}>
            {renderItem()}
          </n-grid>
        </n-form>
      )
    },
  })
</script>

<style scoped></style>
