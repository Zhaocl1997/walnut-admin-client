<script lang="tsx">
  import type { WForm } from '../../types'

  import { clone, omit, isFunction, isBoolean } from 'lodash-es'

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

      const { t } = useAppI18n()

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
          {...(isBoolean(item?.formProp?.rule) &&
          isBoolean(item?.formProp?.label)
            ? omit(clone(item?.formProp), 'rule', 'label')
            : isBoolean(item?.formProp?.rule)
            ? omit(item?.formProp, 'rule')
            : isBoolean(item?.formProp?.label)
            ? omit(clone(item?.formProp), 'label')
            : item?.formProp)}
          class={formProps.value.formItemClass}
        >
          {{
            default: () => renderBase(),
            label: () => {
              if (
                item?.type === 'Extend:Dict' &&
                item?.formProp?.label === true
              ) {
                const res = AppDictMap.get(item?.componentProp?.dictType!)

                if (!res) return

                return (
                  <>
                    {t(res?.name!)}{' '}
                    {item?.formProp?.labelHelpMessage && (
                      <w-message
                        class="inline"
                        msg={getFormTranslated(t, formProps, item!, true)}
                      />
                    )}
                  </>
                )
              }

              return (
                <>
                  {getFormTranslated(t, formProps, item!)}{' '}
                  {item?.formProp?.labelHelpMessage && (
                    <w-message
                      class="inline"
                      msg={getFormTranslated(t, formProps, item!, true)}
                    />
                  )}
                </>
              )
            },
          }}
        </n-form-item>
      )

      return () =>
        getEPBooleanValue(item, formProps.value, 'vIf') && renderNFormItem()
    },
  })
</script>
