<script lang="tsx">
  import type { WForm } from './types'
  import { renderSlot, renderList } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'

  import { useFormSchemas } from './hooks/useFormSchemas'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormEvents } from './hooks/useFormEvents'
  import { useFormAdvanced } from './hooks/useFormAdvanced'

  import { props, extendProps } from './props'
  import { generateBaseRules, getEPBooleanValue } from './utils'

  import WFormItem from './components/FormItem/index.vue'
  import WFormItemExtendQuery from './components/Extend/Query.vue'
  import WFormItemExtendDivider from './components/Extend/Divider.vue'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props,

    emits: ['hook', 'reset', 'query'],

    setup(props: WForm.Props, { attrs, slots, emit, expose }) {
      const formRef = ref<Nullable<WForm.Inst.NFormInst>>(null)

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(getProps)

      const { onEvent } = useFormEvents(getProps)

      // @ts-ignore
      setFormContext({
        formRef,
        formProps: getProps,
        formSchemas,
        formEvent: onEvent,
        setProps,
      })

      const renderItem = () =>
        renderList(
          formSchemas.value.filter(
            (i) =>
              getEPBooleanValue(i, getProps.value, 'vIf') &&
              getEPBooleanValue(i, getProps.value, 'vShow')
          ),
          (item, index) => {
            if (item.type === 'Extend:Query') {
              return (
                <n-gi key="query" span={4} suffix={true}>
                  <WFormItemExtendQuery {...item.componentProp} />
                </n-gi>
              )
            }

            if (item.type === 'Extend:Divider') {
              return (
                <n-gi key={item.componentProp?.title} span={24}>
                  <WFormItemExtendDivider
                    index={index}
                    {...item.componentProp}
                  />
                </n-gi>
              )
            }

            return (
              <n-gi
                key={item.formProp?.path}
                {...(item?.gridProp ?? { span: unref(getProps).span })}
                v-show={item.foldShow}
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
          }
        )

      const getNFormProps = computed(() =>
        easyOmit(getProps.value, Object.keys(extendProps))
      )

      const getNFormRules = computed(() =>
        unref(getProps).baseRules
          ? generateBaseRules(formSchemas.value, getProps)
          : unref(getProps).rules
      )

      const renderNForm = () => (
        <n-form
          ref={formRef}
          {...getNFormProps.value}
          class={attrs.class}
          rules={getNFormRules.value}
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

      const { renderAdvanced, ...advancedMethods } = useFormAdvanced(
        renderNForm,
        getProps,
        formRef
      )

      const methods = {
        validate: () =>
          new Promise<boolean>((reslove) => {
            formRef.value?.validate((err) => {
              reslove(!err ? true : false)
            })
          }),
        restoreValidation: () => formRef.value?.restoreValidation(),
      }

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

      return () => (unref(getProps).preset ? renderAdvanced() : renderNForm())
    },
  })
</script>

<style scoped></style>
