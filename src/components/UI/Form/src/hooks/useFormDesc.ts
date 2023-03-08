import { isUndefined } from 'lodash-es'
import type { WForm } from '../types'

import { getFormTranslated } from '../utils'
import type { WDescriptionsItem } from '@/components/UI/Descriptions'

export const useFormDesc = (
  props: ComputedRef<WForm.Props<any>>,
  schemas: Ref<WForm.Schema.Item<any>[]>,
  t: Fn,
) => {
  const getDefaultDescItemsBySchemas = computed(
    () =>
      schemas.value
        .filter(i => i.formProp?.path)
        .map(i => ({
          key: i.formProp?.path,
          type: i.descriptionProp?.type,
          show: i.descriptionProp?.show,
          // @ts-expect-error
          dictType: i.descriptionProp?.dictType!,
          label: getFormTranslated(t, props, i),
          value: props.value.model![i.formProp?.path!],
          span: i.descriptionProp?.span ?? props.value.descriptionProps?.column,
          formatter: i.descriptionProp?.formatter,
        })) as WDescriptionsItem[],
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
