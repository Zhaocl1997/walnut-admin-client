<script lang="tsx">
  import type { WForm } from './types'
  import type { WDescriptionsItem } from '../../Descriptions'
  import { renderSlot } from 'vue'
  import { easyOmit, isUndefined } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'

  import { useFormSchemas } from './hooks/useFormSchemas'
  import { setFormContext } from './hooks/useFormContext'
  import { useFormEvents } from './hooks/useFormEvents'
  import { useFormAdvanced } from './hooks/useFormAdvanced'
  import { useFormBaseRules } from './hooks/useFormBaseRules'

  import { props, extendProps } from './props'

  import WFormItem from './components/FormItem/index.vue'
  import WFormItemExtendQuery from './components/Extend/Query.vue'
  import WFormItemExtendDivider from './components/Extend/Divider.vue'
  import { getFormTranslated } from './utils'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props,

    emits: ['hook', 'reset', 'query'],

    setup(props: WForm.Props, { attrs, slots, emit, expose }) {
      const formRef = ref<Nullable<WForm.Inst.NFormInst>>(null)

      const { t } = useAppI18n()

      const { setProps, getProps } = useProps<WForm.Props>(props)

      const { formSchemas } = useFormSchemas(getProps)

      ;(async () => {
        // cached for dict form item
        await Promise.all(
          formSchemas.value?.map((i) => useDict(i.componentProp?.dictType))
        )
      })()

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
              <n-gi key="query" span={4} suffix={true}>
                <WFormItemExtendQuery {...item.componentProp} />
              </n-gi>
            )
          }

          if (item.type === 'Extend:Divider') {
            return (
              <n-gi
                v-show={item._internalShow}
                key={item.formProp?.path}
                span={24}
                class={item.extraProp?.sticky ? 'sticky top-0 z-10' : ''}
                style={
                  item.extraProp?.sticky
                    ? { backgroundColor: item.extraProp.bgColor }
                    : {}
                }
              >
                <WFormItemExtendDivider index={index} {...item.componentProp} />
              </n-gi>
            )
          }

          return (
            <n-gi
              v-show={item._internalShow}
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

      const getDefaultDescItemsBySchemas = computed(() => {
        return formSchemas.value.map((i) => ({
          type: i.descriptionProp?.type,
          dictType: i.descriptionProp?.dictType!,
          label: getFormTranslated(t, getProps, i),
          value: getProps.value.model![i.formProp?.path!],
          span:
            i.descriptionProp?.span ?? getProps.value.descriptionProps?.column,
          formatter: i.descriptionProp?.formatter,
        })) as WDescriptionsItem[]
      })

      const renderBaseContent = () =>
        unref(getProps).useDescription ? (
          <w-descriptions
            {...unref(getProps).descriptionProps}
            items={
              isUndefined(unref(getProps).descriptionProps?.items)
                ? getDefaultDescItemsBySchemas.value
                : unref(getProps).descriptionProps?.items
            }
          ></w-descriptions>
        ) : (
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

      const { renderAdvanced, ...advancedMethods } = useFormAdvanced(
        renderBaseContent,
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

      return () =>
        unref(getProps).preset ? renderAdvanced() : renderBaseContent()
    },
  })
</script>

<style scoped></style>
