<script lang="tsx">
  import type { WForm } from '../../types'

  import { easyOmit, isFunction } from 'easy-fns-ts'

  import { componentMap } from './utils'
  import { useFormContext } from '../../hooks/useFormContext'
  import { getEPBooleanValue, getFormTranslated } from '../../utils'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WForm.Schema.Item>,
    },

    emits: [],

    setup(props, { attrs, slots, emit, expose }) {
      const { item } = props

      const { formProps } = useFormContext()

      const renderBase =
        item?.type === 'Base:Render'
          ? () =>
              isFunction(item!.componentProp?.render) &&
              item!.componentProp?.render!({
                formData: formProps.value.model!,
              })
          : item?.type === 'Base:Slot'
          ? () => slots.default!()
          : () => {
              const component = componentMap.get(item?.type.split(':')[1])

              return (
                component && (
                  <component
                    is={component}
                    v-model={[
                      formProps.value.model![item?.formProp?.path!],
                      'value',
                    ]}
                    {...item?.componentProp}
                    class={formProps.value.formItemComponentClass}
                  ></component>
                )
              )
            }

      const renderNFormItem = () => (
        <n-form-item
          vShow={getEPBooleanValue(item, formProps.value, 'vShow')}
          {...(typeof item?.formProp?.rule === 'boolean'
            ? easyOmit(item?.formProp, 'rule')
            : item?.formProp)}
          class={formProps.value.formItemClass}
        >
          {{
            default: () => renderBase(),
            label: () => (
              <>
                {getFormTranslated(formProps, item!)}{' '}
                {item?.formProp?.labelHelpMessage && (
                  <w-message msg={getFormTranslated(formProps, item!, true)} />
                )}
              </>
            ),
          }}
        </n-form-item>
      )

      return () =>
        getEPBooleanValue(item, formProps.value, 'vIf') && renderNFormItem()
    },
  })
</script>
