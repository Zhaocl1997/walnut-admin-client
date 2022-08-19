<script lang="tsx">
  import type { WForm } from './types'
  import { renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '@/hooks/core/useExpose'
  import { useProps } from '@/hooks/core/useProps'

  import { useFormSchemas } from './hooks/useFormSchemas'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormEvents } from './hooks/useFormEvents'
  import { useFormAdvanced } from './hooks/useFormAdvanced'
  import { useFormBaseRules } from './hooks/useFormBaseRules'
  import { useFormDict } from './hooks/useFormDict'
  import { useFormDesc } from './hooks/useFormDesc'
  import { useFormMethods } from './hooks/useFormMethods'

  import { props, extendProps } from './props'
  import { components } from './utils/component'

  import WFormItem from './components/FormItem/index.vue'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props,

    components,

    emits: ['hook', 'reset', 'query'],

    setup(props: WForm.Props, { attrs, slots, emit, expose }) {
      const formRef = ref<Nullable<WForm.Inst.NFormInst>>(null)

      const { t } = useAppI18n()

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(getProps)

      // cached for dict form item
      // @ts-ignore
      useFormDict(formSchemas)

      const { onEvent } = useFormEvents(getProps)

      // @ts-ignore
      const baseRules = useFormBaseRules(getProps, formSchemas)

      // @ts-ignore
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
                ></w-form-item-extend-query>
              </n-gi>
            )
          }

          if (item.type === 'Extend:Divider') {
            return (
              <n-gi
                vShow={item._internalShow}
                key={item.formProp?.path}
                span={24}
                class={item.extraProp?.sticky ? 'sticky top-0 z-10' : ''}
                style={
                  item.extraProp?.sticky
                    ? { backgroundColor: item.extraProp.bgColor }
                    : {}
                }
              >
                <w-transition {...item?.transitionProp} appear>
                  <w-form-item-extend-divider
                    index={index}
                    {...item.componentProp}
                  ></w-form-item-extend-divider>
                </w-transition>
              </n-gi>
            )
          }

          return (
            <n-gi
              vShow={item._internalShow}
              key={item.formProp?.path}
              {...(item?.gridProp ?? { span: unref(getProps).span })}
            >
              <w-transition {...item?.transitionProp} appear>
                <WFormItem item={item}>
                  {item.type === 'Base:Slot' &&
                    Object.keys(slots).includes(item.formProp?.path!) &&
                    renderSlot(slots, item.formProp?.path!)}
                </WFormItem>
              </w-transition>
            </n-gi>
          )
        })

      const getNFormProps = computed(() =>
        easyOmit(getProps.value, Object.keys(extendProps))
      )

      const renderBaseContent = () => {
        if (unref(getProps).useDescription) {
          const { descProps } = useFormDesc(getProps, formSchemas, t)

          return (
            <w-form-extend-descriptions
              {...descProps}
            ></w-form-extend-descriptions>
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
        formRef
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
