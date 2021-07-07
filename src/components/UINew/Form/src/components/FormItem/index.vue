<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '../../types'

  import { defineComponent } from 'vue'
  import { isFunction } from 'easy-fns-ts'

  import WFormItemTransition from '/@/components/Help/Transition'
  import WHelpMessage from '/@/components/Extra/HelpMessage'

  import { componentMap } from './utils'
  import { useFormContext } from '../../hooks/useFormContext'
  import { getEPBooleanValue, getBoolean } from '../../utils'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    components: {
      WFormItemTransition,
      WHelpMessage,
    },

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
                formData: formProps?.model!,
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
                      formProps!.model![item?.formProp?.path!],
                      'value',
                    ]}
                    {...item?.componentProp}
                  ></component>
                )
              )
            }

      const renderNFormItem = () => {
        return (
          <n-form-item
            vShow={getEPBooleanValue(item, formProps!, 'vShow')}
            {...item?.formProp}
          >
            {{
              default: () => renderBase(),
              label: () => (
                <>
                  {item?.formProp?.label}{' '}
                  {item?.formProp?.labelHelpMessage && (
                    <w-help-message
                      msg={item?.formProp?.labelHelpMessage}
                    ></w-help-message>
                  )}
                </>
              ),
            }}
          </n-form-item>
        )
      }

      const renderContent = () => (
        <w-form-item-transition {...item?.transitionProp} appear>
          {getEPBooleanValue(item, formProps!, 'vIf') && renderNFormItem()}
        </w-form-item-transition>
      )

      return () => renderContent()
    },
  })
</script>
