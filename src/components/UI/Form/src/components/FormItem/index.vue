<script lang="ts" setup generic="T">
import type { WForm } from '../../types'
import { isFunction } from 'lodash-es'
import { useFormContext } from '../../hooks/useFormContext'
import { getFormBooleanField, getFormTranslated } from '../../utils'
import { componentMap } from './componentMap'

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

const getBuiltInComp = componentMap.get(item?.type.split(':')[1])
</script>

<template>
  <n-form-item v-if="getFormBooleanField(item, formProps, 'vIf')">
    <template #label>
      <div class="flex flex-row flex-nowrap items-center justify-end gap-x-1">
        <template v-if="item.type === 'Business:Dict' && item.formProp?.label === true">
          {{ $t(getFormItemDictLabel) }}
        </template>
        <template v-else>
          {{ getFormTranslated($t, formProps, item) }}
        </template>

        <WMessage v-if="item.formProp?.labelHelpMessage" :msg="getFormTranslated($t, formProps, item, 'helpMsg')" />
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
