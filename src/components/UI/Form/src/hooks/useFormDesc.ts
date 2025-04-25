import type { ICompUIDescriptionsItem } from '@/components/UI/Descriptions'
import type { WForm } from '../types'

import { isUndefined } from 'lodash-es'
import { formItemUtils } from '../utils'

export function useFormDesc(props: ComputedRef<WForm.Props<any>>, schemas: Ref<WForm.Schema.Item<any>[]>, t: Fn) {
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
          label: formItemUtils.getTranslatedString(t, i, unref(props)),
          value: props.value.model![i.formProp?.path!],
          span: i.descriptionProp?.span ?? props.value.descriptionProps?.column,
          formatter: i.descriptionProp?.formatter,
        })) as ICompUIDescriptionsItem[],
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
