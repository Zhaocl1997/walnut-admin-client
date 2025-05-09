<script lang="ts" setup generic="T extends Recordable">
import type { FormRules } from 'naive-ui'
import type { WForm } from './types'
import { omit } from 'lodash-es'

import WFormItem from '../src/components/FormItem/index.vue'
import WFormItemExtendDivider from './components/Extend/Divider'
import WFormItemExtendQuery from './components/Extend/Query'

import { setFormContext } from './hooks/useFormContext'

import { useFormDialog } from './hooks/useFormDialog'
import { useFormItemId } from './hooks/useFormItemId'
import { useFormMethods } from './hooks/useFormMethods'

import { useFormSchemas } from './hooks/useFormSchemas'
import { extendedFormPropKeys, formItemUtils as FIU, generateBaseRules, getScopeOrGlobalProp } from './utils'

defineOptions({
  name: 'WCompUIForm',
})

const props = withDefaults(defineProps<WForm.Props<T> & { class?: string }>(), {
  labelAlign: 'right',
  labelPlacement: 'left',
  model: (): any => {},
  showRequireMark: undefined,
  showFeedback: true,
  showLabel: undefined,
  schemas: () => [],
  cols: 24,
  span: 24,
  xGap: 0,
  yGap: 0,
  baseRules: false,
  visibleMode: 'auto-forward',
})

const emits = defineEmits<WForm.Emits<T>>()

const { t } = useAppI18n()

const queryActive = ref(false)

const formRef = templateRef<WForm.Inst.NFormInst>('formRef')

const formPropsCtx = useProps<WForm.Props<T>>(props)

const { setProps, getProps } = formPropsCtx

const getFormProps = computed(() => omit(getProps.value, extendedFormPropKeys))

const formItemIdCtx = useFormItemId()

const dialogFormRef = templateRef<WForm.Inst.DialogInst>('dialogFormRef')
const DialogWrapper = useFormDialog(getProps, formRef)
const [DefineForm, ReuseForm] = createReusableTemplate()

const formSchemas = useFormSchemas<T>(getProps, formItemIdCtx)

const formMethods = useFormMethods<T>(formRef)

const getFormRules = computed<FormRules>(() =>
  getProps.value.baseRules
    // @ts-expect-error too deep, don't know why
    ? generateBaseRules<T>(t, formSchemas, getProps)
    : getProps.value.rules)

// set context
setFormContext({
  formRef,
  formSchemas,
  formEvent: emits,
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
  onOpen: async (beforeHook?: (done: Fn) => void) => {
    await dialogFormRef.value?.onOpen(beforeHook)
  },
  onClose: () => {
    dialogFormRef.value?.onClose()
  },
})

// need to optimise or not?
function getGridItemStyle(item: WForm.Schema.Item<T>, mode?: 'query' | 'divider'): CSSProperties {
  const span = getScopeOrGlobalProp(item, 'gridProp.span', getProps.value)

  if (mode === 'query') {
    return {
      gridColumn: !queryActive.value ? `span 24 / span 24` : undefined,
      justifySelf: 'end',
    }
  }

  if (mode === 'divider') {
    return {
      gridColumn: `span 24 / span 24`,
    }
  }

  return {
    gridColumn: `span ${span} / span ${span}`,
  }
}
</script>

<template>
  <DefineForm>
    <n-form ref="formRef" :rules="getFormRules" v-bind="getFormProps">
      <div
        class="relative grid"
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
          <div
            v-if="item.type === 'Extend:Query' && FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
            v-show="FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
            :style="Object.assign(getGridItemStyle(item, 'query'), item.gridProp?.style)"
            :class="item.gridProp?.class"
          >
            <WTransition appear>
              <n-form-item :show-feedback="false">
                <WFormItemExtendQuery v-bind="item.componentProp" v-model:active="queryActive" />
              </n-form-item>
            </WTransition>
          </div>

          <div
            v-else-if="item.type === 'Extend:Divider' && FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
            v-show="FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
            :style="Object.assign(getGridItemStyle(item, 'divider'), item.gridProp?.style)"
            :class="item.gridProp?.class"
          >
            <WTransition appear>
              <n-form-item>
                <WFormItemExtendDivider v-bind="item.componentProp" :index="index" />
              </n-form-item>
            </WTransition>
          </div>

          <template v-else>
            <template v-if="getScopeOrGlobalProp(item, 'visibleProp.visibleMode', getProps) === 'no-move'">
              <div :style="Object.assign(getGridItemStyle(item), item.gridProp?.style)" :class="item.gridProp?.class">
                <WTransition
                  v-if="getScopeOrGlobalProp(item, 'transitionProp.transitionName', getProps)"
                  v-bind="item.transitionProp"
                  :transition-name="getScopeOrGlobalProp(item, 'transitionProp.transitionName', getProps)"
                  appear
                >
                  <WFormItem
                    v-if="FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
                    v-show="item._internalShow && FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
                    :item="item"
                  >
                    <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                      <slot :name="item.formProp?.path" />
                    </template>
                  </WFormItem>
                </WTransition>

                <WFormItem
                  v-else-if="FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
                  v-show="item._internalShow && FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
                  :item="item"
                >
                  <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                    <slot :name="item.formProp?.path" />
                  </template>
                </WFormItem>
              </div>
            </template>

            <template v-else-if="getScopeOrGlobalProp(item, 'visibleProp.visibleMode', getProps) === 'auto-forward'">
              <WTransition
                v-if="getScopeOrGlobalProp(item, 'transitionProp.transitionName', getProps)"
                v-bind="item.transitionProp"
                :transition-name="getScopeOrGlobalProp(item, 'transitionProp.transitionName', getProps)"
                appear
              >
                <div
                  v-if="FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
                  v-show="item._internalShow && FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
                  :style="Object.assign(getGridItemStyle(item), item.gridProp?.style)"
                  :class="item.gridProp?.class"
                >
                  <WFormItem :item="item">
                    <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                      <slot :name="item.formProp?.path" />
                    </template>
                  </WFormItem>
                </div>
              </WTransition>

              <div
                v-else-if="FIU.getIfOrShowBoolean(item, getProps, 'vIf')"
                v-show="item._internalShow && FIU.getIfOrShowBoolean(item, getProps, 'vShow')"
                :style="Object.assign(getGridItemStyle(item), item.gridProp?.style)"
                :class="item.gridProp?.class"
              >
                <WFormItem :item="item">
                  <template v-if="item.type === 'Base:Slot' && item.formProp?.path" #[item.formProp?.path]>
                    <slot :name="item.formProp?.path" />
                  </template>
                </WFormItem>
              </div>
            </template>
          </template>
        </template>
      </div>
    </n-form>
  </DefineForm>

  <DialogWrapper v-if="getProps.dialogPreset" ref="dialogFormRef">
    <ReuseForm />
  </DialogWrapper>
  <ReuseForm v-else />
</template>
