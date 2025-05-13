<script lang="ts" setup>
import type { ICompUIDescriptionsItem } from '@/components/UI/Descriptions'
import { useFormContext } from '../../../hooks/useFormContext'
import { formItemUtils } from '../../../utils'

defineOptions({
  name: 'WFormExtendDesc',
})

const { t } = useAppI18n()

const { formSchemas, formPropsCtx } = useFormContext()

const { getProps: formProps } = formPropsCtx

const getDescItems = computed(() => {
  return formSchemas.value
    .filter(i => i.formProp?.path)
    .map(i => ({
      key: i.formProp?.path,
      show: i.descriptionProp?.show,
      value: formProps.value.model[i.formProp?.path],
      formatter: i.descriptionProp?.formatter,

      type: i.descriptionProp?.type,
      typeProps: i.descriptionProp?.typeProps,
      label: formItemUtils.getTranslatedString(t, i, formProps.value),
      span: i.descriptionProp?.span ?? formProps.value.descriptionProps?.column,
    } as ICompUIDescriptionsItem))
})
</script>

<template>
  <WDescriptions
    v-bind="formProps.descriptionProps"
    :label-placement="formProps.labelPlacement"
    :items="getDescItems"
  />
</template>
