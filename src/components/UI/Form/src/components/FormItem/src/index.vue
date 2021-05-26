<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, computed, Transition, unref } from 'vue'
  import { isFunction, isUndefined } from 'easy-fns-ts'

  import { useFormContext } from '/@/components/UI/Form/src/hooks/useFormContext'
  import { componentMap } from './componentMap'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WForm.Schema.Item>,
    },

    setup(props, ctx) {
      const { item } = props
      const { slots } = ctx

      const { formProps } = useFormContext()

      // get target field boolean value
      const getBooleanValue = (field: string) => {
        const bool = item?.extraProp?.[field]

        if (typeof bool === 'function') {
          return bool({ formData: formProps.value.modelValue! })
        }

        return isUndefined(bool) ? true : bool
      }

      // Render component core function
      // DO NOT declare too many functions outside this function,
      // Cause some functions are only usable in some cases
      // So define the function when we need it
      // Decrease the memory use
      const renderComponent = () => {
        return item?.type === 'Render'
          ? () =>
              isFunction(item!.extraProp?.render) &&
              item!.extraProp?.render!({
                formData: formProps.value.modelValue!,
              })
          : item?.type === 'Slot'
          ? () => slots.default!()
          : () => {
              const renderBaseComponents = () => {
                const component = componentMap.get(item?.type)

                return (
                  component && (
                    <component
                      is={component}
                      v-model={
                        formProps.value.modelValue![item!.formProp?.prop!]
                      }
                      {...item?.componentProp}
                    ></component>
                  )
                )
              }

              return renderBaseComponents()
            }
      }

      // render transition wrap
      const renderFormItem = () => (
        <el-form-item
          {...(item!.formProp ?? {})}
          style={formProps.value.compact ? { marginBottom: '10px' } : {}}
        >
          {renderComponent()}
        </el-form-item>
      )

      // render el-col wrap
      const renderContent = () => {
        const vShow = getBooleanValue('vShow')
        const foldShow = getBooleanValue('foldShow')

        const getColProp = computed(
          () => item?.colProp ?? { span: formProps.value.span }
        )

        return formProps.value.inline ? (
          renderFormItem()
        ) : (
          <el-col vShow={vShow && foldShow} {...unref(getColProp)}>
            {renderFormItem()}
          </el-col>
        )
      }

      return () => {
        const vIf = getBooleanValue('vIf')

        return (
          <Transition name="fade" mode="out-in" appear>
            {vIf && renderContent()}
          </Transition>
        )
      }
    },
  })
</script>
