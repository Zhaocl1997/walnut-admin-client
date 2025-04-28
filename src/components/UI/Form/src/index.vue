<script lang="ts" setup generic="T extends Recordable">
import type { FormRules } from 'naive-ui'
import type { WForm } from './types'
import { omit } from 'lodash-es'

import WFormItem from '../src/components/FormItem/index.vue'
import WFormItemExtendDivider from './components/Extend/Divider'
import WFormItemExtendQuery from './components/Extend/Query'

import { setFormContext } from './hooks/useFormContext'

import { useFormDict } from './hooks/useFormDict'
import { useFormEvents } from './hooks/useFormEvents'
import { useFormItemId } from './hooks/useFormItemId'
import { useFormMethods } from './hooks/useFormMethods'
import { useFormSchemas } from './hooks/useFormSchemas'

import { formItemUtils, generateBaseRules } from './utils'

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
  visibleMode: 'auto-forward',
})

const emits = defineEmits<WForm.Emits<T>>()

const { t } = useAppI18n()

const formRef = templateRef<WForm.Inst.NFormInst>('formRef')

const formPropsCtx = useProps<WForm.Props<T>>(props)

const { setProps, getProps } = formPropsCtx

const formItemIdCtx = useFormItemId()

const formSchemas = useFormSchemas<T>(getProps, formItemIdCtx)

const formEvent = useFormEvents<T>(getProps)

const formMethods = useFormMethods<T>(formRef)

const getFormRules = computed<FormRules>(() =>
  getProps.value.baseRules
    // @ts-expect-error
    ? generateBaseRules<T>(t, formSchemas.value, getProps)
    : getProps.value.rules)

setFormContext({
  formRef,
  formSchemas,
  formEvent,
  formItemIdCtx,
  formPropsCtx,
})

// expose
defineExpose({
  ...formMethods,
})

// hook
emits('hook', {
  ...formMethods,
  setProps,
})

nextTick(() => {
  useFormDict<T>(formSchemas.value)
})
</script>

<template>
  <n-form ref="formRef" :rules="getFormRules" v-bind="omit(getProps, 'rules')">
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${getProps.cols}, minmax(0, 1fr))`,
        rowGap: `${getProps.yGap}px`,
        columnGap: `${getProps.xGap}px`,
      }"
    >
      <template
        v-for="(item, index) in formSchemas"
        :key="item.type === 'Extend:Query' ? `form-query-${index}` : item.type === 'Extend:Divider' ? `form-divider-${index}` : item.formProp?.path"
      >
        <n-gi
          v-if="item.type === 'Extend:Query'"
          class="flex items-center justify-end"
          :span="getProps.span"
          suffix
        >
          <WTransition appear>
            <n-form-item>
              <WFormItemExtendQuery v-bind="item.componentProp" />
            </n-form-item>
          </WTransition>
        </n-gi>

        <n-gi
          v-else-if="item.type === 'Extend:Divider'"
          :span="24"
          :class="[item.extraProp?.sticky ? 'sticky top-0 z-10' : '']"
          :style=" item.extraProp?.sticky
            ? { backgroundColor: item.extraProp.bgColor }
            : {}"
        >
          <WTransition appear>
            <n-form-item>
              <WFormItemExtendDivider v-bind="item.componentProp" :index="index" />
            </n-form-item>
          </WTransition>
        </n-gi>

        <template v-else>
          <template v-if="formItemUtils.getScopeOrGlobalProp(item, 'extraProp', getProps, 'visibleMode') === 'no-move'">
            <div
              v-bind="item.gridProp"
              :style="{
                gridColumn: `span ${item.gridProp?.span ?? getProps.span} / span ${item.gridProp?.span ?? getProps.span}`,
              }"
            >
              <WTransition v-bind="item.transitionProp" :transition-name="item?.transitionProp?.name ?? getProps.transitionName" appear>
                <WFormItem
                  v-if="formItemUtils.getIfOrShowBooleanValue(item, getProps, 'vIf')"
                  v-show="item._internalShow && formItemUtils.getIfOrShowBooleanValue(item, getProps, 'vShow')"
                  :item="item"
                >
                  <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                    <slot :name="item.formProp?.path" />
                  </template>
                </WFormItem>
              </WTransition>
            </div>
          </template>

          <template v-if="formItemUtils.getScopeOrGlobalProp(item, 'extraProp', getProps, 'visibleMode') === 'auto-forward'">
            <WTransition v-bind="item.transitionProp" :transition-name="item?.transitionProp?.name ?? getProps.transitionName" appear>
              <div
                v-if="formItemUtils.getIfOrShowBooleanValue(item, getProps, 'vIf')"
                v-show="item._internalShow && formItemUtils.getIfOrShowBooleanValue(item, getProps, 'vShow')"
                v-bind="item.gridProp"
                :style="{
                  gridColumn: `span ${item.gridProp?.span ?? getProps.span} / span ${item.gridProp?.span ?? getProps.span}`,
                }"
              >
                <WFormItem :item="item">
                  <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                    <slot :name="item.formProp?.path" />
                  </template>
                </WFormItem>
              </div>
            </WTransition>
          </template>
        </template>
      </template>
    </div>
  </n-form>
</template>
