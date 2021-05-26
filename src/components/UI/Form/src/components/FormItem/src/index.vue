<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, computed, Transition, unref, watch } from 'vue'
  import { isFunction } from 'easy-fns-ts'

  import { useFormContext } from '/@/components/UI/Form/src/hooks/useFormContext'
  import { componentMap } from './componentMap'
  import { getEPBooleanValue } from '/@/components/UI/Form/src/utils'

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

      // handle VVC item
      watch(
        () => formProps.value.modelValue,
        () => {
          if (
            getEPBooleanValue(item, formProps, 'VVC') &&
            !(
              getEPBooleanValue(item, formProps, 'vIf') &&
              getEPBooleanValue(item, formProps, 'vShow') &&
              getEPBooleanValue(item, formProps, 'foldShow')
            )
          ) {
            // really straight forward to set undefined
            // i think maybe better solution
            // also it will not support for nested `prop`
            formProps.value.modelValue[item?.formProp?.prop!] = undefined
          }
        },
        {
          deep: true,
        }
      )

      // Render component core function
      // DO NOT declare too many functions outside this function,
      // Cause some functions are only usable in some cases
      // So define the function when we need it
      // Decrease the memory use
      const renderComponent = () =>
        item?.type === 'Render'
          ? () =>
              isFunction(item!.extraProp?.render) &&
              item!.extraProp?.render!({
                formData: formProps.value.modelValue!,
              })
          : item?.type === 'Slot'
          ? () => slots.default!()
          : () => {
              const component = componentMap.get(item?.type)

              return (
                component && (
                  <component
                    is={component}
                    v-model={formProps.value.modelValue![item!.formProp?.prop!]}
                    {...item?.componentProp}
                  ></component>
                )
              )
            }

      // render el-form-item with target typed component
      const renderFormItem = () => (
        <el-form-item
          {...(item!.formProp ?? {})}
          style={formProps.value.compact ? { marginBottom: '10px' } : {}}
        >
          {renderComponent()}
        </el-form-item>
      )

      // render transition content
      const renderContent = () => {
        const getColProp = computed(
          () => item?.colProp ?? { span: formProps.value.span }
        )

        return formProps.value.inline ? (
          renderFormItem()
        ) : (
          <el-col
            vShow={
              getEPBooleanValue(item, formProps, 'vShow') &&
              getEPBooleanValue(item, formProps, 'foldShow')
            }
            {...unref(getColProp)}
          >
            {renderFormItem()}
          </el-col>
        )
      }

      return () => (
        <Transition name="fade" mode="out-in" appear>
          {getEPBooleanValue(item, formProps, 'vIf') && renderContent()}
        </Transition>
      )
    },
  })
</script>
