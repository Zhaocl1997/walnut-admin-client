<script lang="tsx">
  import type { WForm } from '../../types'

  import { isFunction } from 'easy-fns-ts'

  import { componentMap } from './utils'
  import { useFormContext } from '../../hooks/useFormContext'
  import { getEPBooleanValue } from '../../utils'

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
                      formProps.value.model![item?.formProp?.path! as string],
                      'value',
                    ]}
                    {...item?.componentProp}
                    class={formProps.value.formItemComponentClass}
                  ></component>
                )
              )
            }

      const renderNFormItem = () => {
        return (
          <n-form-item
            vShow={getEPBooleanValue(item, formProps.value, 'vShow')}
            {...item?.formProp}
            class={formProps.value.formItemClass}
          >
            {{
              default: () => renderBase(),
              label: () => (
                <>
                  {item?.formProp?.label}{' '}
                  {item?.formProp?.labelHelpMessage && (
                    <w-message
                      msg={item?.formProp?.labelHelpMessage}
                    ></w-message>
                  )}
                </>
              ),
            }}
          </n-form-item>
        )
      }

      const renderContent = () => (
        <w-transition {...item?.transitionProp} appear>
          {getEPBooleanValue(item, formProps.value, 'vIf') && renderNFormItem()}
        </w-transition>
      )

      return () => renderContent()
    },
  })
</script>
