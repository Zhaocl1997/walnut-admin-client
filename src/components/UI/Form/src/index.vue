<script lang="tsx">
import type { WForm } from './types'
// TODO 111 tsx file need to import explicitly or ts error
import WTransition from '@/components/Extra/Transition'
import { easyOmit } from 'easy-fns-ts'

import { renderSlot } from 'vue'
import WFormItem from './components/FormItem/index.vue'
import { useFormAdvanced } from './hooks/useFormAdvanced'
import { useFormBaseRules } from './hooks/useFormBaseRules'
import { setFormContext } from './hooks/useFormContext'
import { useFormDesc } from './hooks/useFormDesc'
import { useFormDict } from './hooks/useFormDict'
import { useFormEvents } from './hooks/useFormEvents'

import { useFormMethods } from './hooks/useFormMethods'
import { useFormSchemas } from './hooks/useFormSchemas'

import { extendProps, props } from './props'

import { components } from './utils/component'

export default defineComponent({
  name: 'WForm',

  components,

  inheritAttrs: false,

  props,

  emits: ['hook', 'reset', 'query'],

  setup(props: WForm.Props, { attrs, slots, emit, expose }) {
    const formRef = ref<Nullable<WForm.Inst.NFormInst>>(null)

    const { t } = useAppI18n()

    const { setProps, getProps } = useProps<WForm.Props>(props)

    const { formSchemas } = useFormSchemas(getProps)

    // cached for dict form item
    // @ts-expect-error
    useFormDict(formSchemas)

    const { onEvent } = useFormEvents(getProps)

    // @ts-expect-error
    const baseRules = useFormBaseRules(getProps, formSchemas)

    // @ts-expect-error
    setFormContext({
      formRef,
      formProps: getProps,
      formSchemas,
      formEvent: onEvent,
      setProps,
    })

    const renderItem = () =>
      formSchemas.value.map((item, index) => {
        if (item.type === 'Extend:Query') {
          return (
            <n-gi
              key="query"
              class="flex items-center justify-end"
              span={unref(getProps).span}
              suffix={true}
            >
              <w-form-item-extend-query
                {...item.componentProp}
              >
              </w-form-item-extend-query>
            </n-gi>
          )
        }

        if (item.type === 'Extend:Divider') {
          return (
          // TODO temporary solution
          // should use v-show, but get errors
            item._internalShow && (
              <n-gi
                key={item.formProp?.path}
                span={24}
                class={item.extraProp?.sticky ? 'sticky top-0 z-10' : ''}
                style={
                  item.extraProp?.sticky
                    ? { backgroundColor: item.extraProp.bgColor }
                    : {}
                }
              >
                <WTransition {...item?.transitionProp} appear>
                  <w-form-item-extend-divider
                    index={index}
                    {...item.componentProp}
                  >
                  </w-form-item-extend-divider>
                </WTransition>
              </n-gi>
            )
          )
        }

        return (
        // TODO temporary solution
        // should use v-show, but get errors
          item._internalShow && (
            <n-gi
              key={item.formProp?.path}
              {...(item?.gridProp ?? { span: unref(getProps).span })}
            >
              <WTransition {...item?.transitionProp} appear>
                <WFormItem item={item}>
                  {item.type === 'Base:Slot'
                    && Object.keys(slots).includes(item.formProp?.path!)
                    && renderSlot(slots, item.formProp?.path!)}
                </WFormItem>
              </WTransition>
            </n-gi>
          )
        )
      })

    const getNFormProps = computed(() =>
      easyOmit(getProps.value, Object.keys(extendProps)),
    )

    const renderBaseContent = () => {
      if (unref(getProps).useDescription) {
        const { descProps } = useFormDesc(getProps, formSchemas, t)

        return (
          <w-form-extend-descriptions
            {...descProps}
          >
          </w-form-extend-descriptions>
        )
      }

      return (
        <n-form
          ref={formRef}
          {...getNFormProps.value}
          class={attrs.class}
          rules={baseRules.value}
        >
          <n-grid
            cols={unref(getProps).cols}
            xGap={unref(getProps).xGap}
            yGap={unref(getProps).yGap}
          >
            {renderItem()}
          </n-grid>
        </n-form>
      )
    }

    const { methods } = useFormMethods(formRef)

    const { renderAdvanced, ...advancedMethods } = useFormAdvanced(
      renderBaseContent,
      getProps,
      formRef,
    )

    // expose
    useExpose({
      apis: {
        ...methods,
        ...advancedMethods,
      },
      expose,
    })

    // hook
    onEvent({
      name: 'hook',
      params: {
        ...methods,
        ...advancedMethods,
        setProps,
      },
    })

    return () =>
      unref(getProps).preset ? renderAdvanced() : renderBaseContent()
  },
})
</script>

<style scoped></style>
