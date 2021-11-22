<script lang="tsx">
  import type { WForm } from '../../types'

  import { isFunction } from 'easy-fns-ts'

  import { componentMap } from './utils'
  import { useFormContext } from '../../hooks/useFormContext'
  import { getBoolean, getEPBooleanValue } from '../../utils'

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

      const getTranslated = (
        item: WForm.Schema.Item,
        helpMsg: boolean = false
      ) => {
        const key = formProps.value.localeUniqueKey

        const isLocale = key && getBoolean(item?.formProp?.locale)

        const isLocaleWithTable =
          getBoolean(item?.formProp?.localeWithTable) &&
          getBoolean(formProps.value.localeWithTable)

        const isHelpMsg = (key: string) => (helpMsg ? `${key}:helpMsg` : key)

        return isLocale
          ? isLocaleWithTable
            ? t(isHelpMsg(`table:${key}:${item?.formProp?.path}`))
            : t(isHelpMsg(`form:${key}:${item?.formProp?.path}`))
          : item?.formProp?.label
      }

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

      const renderNFormItem = () => (
        <n-form-item
          vShow={getEPBooleanValue(item, formProps.value, 'vShow')}
          {...item?.formProp}
          class={formProps.value.formItemClass}
        >
          {{
            default: () => renderBase(),
            label: () => (
              <>
                {getTranslated(item!)}{' '}
                {item?.formProp?.labelHelpMessage && (
                  <w-message msg={getTranslated(item!, true)}></w-message>
                )}
              </>
            ),
          }}
        </n-form-item>
      )

      const renderContent = () => (
        <w-transition {...item?.transitionProp} appear>
          {getEPBooleanValue(item, formProps.value, 'vIf') && renderNFormItem()}
        </w-transition>
      )

      return () => renderContent()
    },
  })
</script>
