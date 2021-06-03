<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, watch, renderSlot } from 'vue'
  import { isFunction } from 'easy-fns-ts'

  import { useFormContext } from '/@/components/UI/Form/src/hooks/useFormContext'
  import {
    getEPBooleanValue,
    getBoolean,
  } from '/@/components/UI/Form/src/utils'
  import { componentMap } from './componentMap'
  import { useFormItemComponents } from './hooks/useComponents'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WForm.Schema.Item>,
      index: Number as PropType<number>,
    },

    setup(props, ctx) {
      const { item } = props
      const { slots } = ctx

      useFormItemComponents()

      const { formProps } = useFormContext()

      const vShow =
        getEPBooleanValue(item, formProps, 'vShow') &&
        getBoolean(item!.foldShow)

      // handle VVC item
      watch(
        () => formProps.value.modelValue,
        () => {
          if (
            getEPBooleanValue(item, formProps, 'VVC') &&
            !(getEPBooleanValue(item, formProps, 'vIf') && vShow)
          ) {
            // really straight forward to set undefined
            // i think maybe better solution
            // also it will not support for nested `prop`
            // TODO menu name prop trigger a bug
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
      const renderBaseComponent = () =>
        item?.type === 'Render'
          ? () =>
              isFunction(item!.componentProp?.render) &&
              item!.componentProp?.render!({
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

      // render el-form-item
      const renderElFormItem = () => (
        <el-form-item
          {...(item!.formProp ?? {})}
          style={formProps.value.compact ? { marginBottom: '10px' } : {}}
        >
          {renderBaseComponent()}
        </el-form-item>
      )

      // render w-form item
      const renderWFormItem = () => {
        // Divider
        if (item?.type === 'Divider') {
          const childrenItems = () =>
            item.componentProp?.children?.map((i) => (
              <w-form-item item={i} key={i.uid}>
                {i.type === 'Slot' &&
                  Object.keys(slots).includes(i.formProp?.prop!) &&
                  renderSlot(slots, i.formProp?.prop!)}
              </w-form-item>
            ))

          return (
            vShow && (
              <>
                <w-form-item-extend-divider item={item} index={props.index} />
                {childrenItems()}
              </>
            )
          )
        }

        return (
          <w-form-item-transition {...item?.transitionProp} appear>
            {formProps.value.inline ? (
              vShow && renderElFormItem()
            ) : (
              <el-col
                vShow={vShow}
                {...(item?.colProp ?? { span: formProps.value.span })}
              >
                {renderElFormItem()}
              </el-col>
            )}
          </w-form-item-transition>
        )
      }

      return () =>
        getEPBooleanValue(item, formProps, 'vIf') && renderWFormItem()
    },
  })
</script>
