<script lang="ts" setup generic="T">
import type { WForm } from '../../types'
import { isFunction } from 'lodash-es'
import { useFormContext } from '../../hooks/useFormContext'
import { formItemUtils } from '../../utils'

defineOptions({
  name: 'WCompUIFormItem',
  inheritAttrs: false,
})

const { item } = defineProps<{ item: WForm.Schema.Item<T> }>()

const { formProps } = useFormContext()

const getFormItemDictLabel = computed(() => getDictNameFromMap((item as WForm.Schema.SchemaItem.DictSchema<T>).componentProp!.dictType) as string)

function FormItemRender() {
  const _item = item as WForm.Schema.SchemaItem.RenderSchema<T>

  return isFunction(_item.componentProp?.render)
    && _item!.componentProp?.render!({
      formData: formProps.value.model!,
    })
}

const getBuiltInComp = formItemUtils.getTargetComponent(item)
</script>

<template>
  <n-form-item v-if="formItemUtils.getIfOrShowBooleanValue(item, formProps, 'vIf')">
    <template #label>
      <div class="flex flex-row flex-nowrap items-center justify-end gap-x-1">
        <template v-if="item.type === 'Business:Dict' && item.formProp?.label === true">
          {{ $t(getFormItemDictLabel) }}
        </template>
        <template v-else>
          {{ formItemUtils.getTranslatedString($t, item, formProps) }}
        </template>

        <WMessage v-if="item.formProp?.labelHelpMessage" :msg="formItemUtils.getTranslatedString($t, item, formProps, 'helpMsg')" />
      </div>
    </template>

    <template #default>
      <FormItemRender v-if="item.type === 'Base:Render'" />
      <slot v-else-if="item.type === 'Base:Slot'" />
      <component
        :is="getBuiltInComp"
        v-if="getBuiltInComp"
        v-model:value="formProps.model![item.formProp?.path!]"
        v-bind="item.componentProp"
        :class="formProps.formItemComponentClass"
      />
    </template>
  </n-form-item>
</template>
