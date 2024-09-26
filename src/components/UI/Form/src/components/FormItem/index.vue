<script lang="tsx">
import { clone, isBoolean, isFunction, omit } from 'lodash-es'
import type { WForm } from '../../types'

import { useFormContext } from '../../hooks/useFormContext'
import {
  generateRuleMessage,
  getFormBooleanField,
  getFormTranslated,
} from '../../utils'
import { componentMap } from './componentMap'

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

    const renderBase
        = item?.type === 'Base:Render'
          ? () =>
              isFunction(item!.componentProp?.render)
              && item!.componentProp?.render!({
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
                      // TODO
                      placeholder={generateRuleMessage(t, formProps, item!)}
                    >
                    </component>
                  )
                )
              }

    const renderLabel = () => {
      if (item?.type === 'Extend:Dict' && item?.formProp?.label === true) {
        const dictName = getDictNameFromMap(item.componentProp?.dictType ?? '')!
        return t(dictName)
      }

      return getFormTranslated(t, formProps, item!)
    }

    const renderLabelHelpMessage = () =>
      item?.formProp?.labelHelpMessage && (
        <w-message
          msg={getFormTranslated(t, formProps, item!, 'helpMsg')}
        >
        </w-message>
      )

    const renderNFormItem = () => (
      // TODO optimise
      <n-form-item
        vShow={getFormBooleanField(item, formProps.value, 'vShow')}
        {...(isBoolean(item?.formProp?.rule)
        && isBoolean(item?.formProp?.label)
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
          label: () => (
            <>
              {renderLabel()}
              {' '}
              {renderLabelHelpMessage()}
            </>
          ),
        }}
      </n-form-item>
    )

    return () =>
      getFormBooleanField(item, formProps.value, 'vIf') && renderNFormItem()
  },
})
</script>
