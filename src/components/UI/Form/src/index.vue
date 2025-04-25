<script lang="ts" setup generic="T extends Recordable">
import type { FormRules } from 'naive-ui'
import type { WForm } from './types'
import { omit } from 'lodash-es'
import WFormItem from '../src/components/FormItem/index.vue'
import WFormItemBuiltInQuery from './components/Extend/Query'
import { setFormContext } from './hooks/useFormContext'
import { useFormDict } from './hooks/useFormDict'

import { useFormEvents } from './hooks/useFormEvents'
import { useFormMethods } from './hooks/useFormMethods'
import { useFormSchemas } from './hooks/useFormSchemas'

import { generateBaseRules } from './utils'

defineOptions({
  name: 'WCompUIForm',
})

const props = withDefaults(defineProps<WForm.Props<T>>(), {
  labelAlign: 'right',
  labelPlacement: 'left',
  model: (): any => {},
  showRequireMark: undefined,
  showFeedback: true,
  showLabel: undefined,
  schemas: () => [],
  cols: 24,
  span: 24,
  xGap: 20,
  yGap: 0,
  baseRules: false,
})

const emits = defineEmits<{ hook: [inst: WForm.Inst.WFormInst] }>()

const { t } = useAppI18n()

const formRef = templateRef<WForm.Inst.NFormInst>('formRef')

// TODO cannot use usePropsAdvanced
const { setProps, getProps } = useProps(props)

const { formSchemas } = useFormSchemas<T>(getProps)

const { onEvent } = useFormEvents<T>(getProps)

const { methods } = useFormMethods(formRef)

useFormDict<T>(formSchemas)

const getFormRules = computed<FormRules>(() =>
  getProps.value.baseRules
    // @ts-expect-error
    ? generateBaseRules<T>(t, formSchemas.value, getProps)
    : getProps.value.rules)

setFormContext({
  formRef,
  formProps: getProps,
  formSchemas,
  formEvent: onEvent,
  setProps,
})

// expose
defineExpose({
  ...methods,
})

// hook
emits('hook', {
  ...methods,
  setProps,
})
</script>

<template>
  <n-form ref="formRef" :rules="getFormRules" v-bind="omit(getProps, 'rules')">
    <n-grid :cols="getProps.cols" :x-gap="getProps.xGap" :y-gap="getProps.yGap">
      <template
        v-for="item in formSchemas"
        :key="item.formProp?.path"
      >
        <n-gi
          v-if="item.type === 'Extend:Query'"
          key="form-query"
          class="flex items-center justify-end" :span="getProps.span" suffix
        >
          <WTransition appear>
            <n-form-item>
              <WFormItemBuiltInQuery v-bind="item.componentProp" />
            </n-form-item>
          </WTransition>
        </n-gi>

        <n-gi
          v-else
          v-show="item._internalShow"
          v-bind="item.gridProp"
          :span="item.gridProp?.span ?? getProps.span"
        >
          <WTransition v-bind="item.transitionProp" appear>
            <WFormItem :item="item">
              <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                <slot :name="item.formProp?.path" />
              </template>
            </WFormItem>
          </WTransition>
        </n-gi>
      </template>
    </n-grid>
  </n-form>
</template>
