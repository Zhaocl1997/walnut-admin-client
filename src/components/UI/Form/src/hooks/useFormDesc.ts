import type { WDescriptionsItem } from '@/components/UI/Descriptions'
import type { WForm } from '../types'

import { isUndefined } from 'lodash-es'

import { getFormTranslated } from '../utils'

export const useFormDesc = (
  props: ComputedRef<WForm.Props<any>>,
  schemas: Ref<WForm.Schema.Item<any>[]>,
  t: Fn
) => {
  const getDefaultDescItemsBySchemas = computed(
    () =>
      schemas.value
        .filter((i) => i.formProp?.path)
        .map((i) => ({
          type: i.descriptionProp?.type,
          // @ts-ignore
          dictType: i.descriptionProp?.dictType!,
          label: getFormTranslated(t, props, i),
          value: props.value.model![i.formProp?.path!],
          span: i.descriptionProp?.span ?? props.value.descriptionProps?.column,
          formatter: i.descriptionProp?.formatter,
        })) as WDescriptionsItem[]
  )

  const descProps = {
    ...unref(props).descriptionProps,
    items: isUndefined(unref(props).descriptionProps?.items)
      ? getDefaultDescItemsBySchemas.value
      : unref(props).descriptionProps?.items,
  }

  return {
    descProps,
  }
}
