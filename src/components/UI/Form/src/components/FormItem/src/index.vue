<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, computed, Transition, unref } from 'vue'
  import { isBoolean, isFunction, isUndefined } from 'easy-fns-ts'

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

      // get v-if value
      const getVIf = () => {
        const { vIf } = item!

        if (isUndefined(vIf)) {
          return true
        }

        if (isBoolean(vIf)) {
          return vIf
        }

        if (typeof vIf === 'function') {
          return vIf({ formData: formProps.value.modelValue! })
        }
      }

      // get v-show value
      const getVShow = () => {
        const { vShow } = item!

        if (isUndefined(vShow)) {
          return true
        }

        if (isBoolean(vShow)) {
          return vShow
        }

        if (typeof vShow === 'function') {
          return vShow({ formData: formProps.value.modelValue! })
        }
      }

      // render base components like input/select
      const renderBaseComponents = () => {
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

      // render custom JSX component
      const renderJSXComponent = () => {
        return item?.type === 'Render' && isFunction(item.render)
          ? item.render!({ formData: formProps.value.modelValue! })
          : renderBaseComponents()
      }

      // render slot component
      const renderSlotComponent = () => {
        return item?.type === 'Slot' ? slots.default!() : renderBaseComponents()
      }

      // render component
      const renderComponent = () => {
        return item?.type === 'Render'
          ? renderJSXComponent()
          : item?.type === 'Slot'
          ? renderSlotComponent()
          : renderBaseComponents()
      }

      // render transition wrap
      const renderTransitionFormItem = () => {
        const vShow = getVShow()

        return (
          <Transition name="fade" mode="out-in" appear>
            <el-form-item
              v-show={vShow}
              {...(item!.formProp ?? {})}
              style={formProps.value.compact ? { marginBottom: '10px' } : {}}
            >
              {renderComponent()}
            </el-form-item>
          </Transition>
        )
      }

      // render el-col wrap
      const renderContent = () => {
        const getColProp = computed(
          () => item!.colProp ?? { span: formProps.value.span }
        )

        return formProps.value.inline ? (
          renderTransitionFormItem()
        ) : (
          <el-col {...unref(getColProp)}>{renderTransitionFormItem()}</el-col>
        )
      }

      return () => {
        const vIf = getVIf()

        return vIf && renderContent()
      }
    },
  })
</script>
