import { ComputedRef } from 'vue'
import type { ElFormItemRule, WFormSchemaItem } from '../types'

import { unref, computed } from 'vue'
import { useI18n } from '/@/locales'

/**
 * @description Generate a default rules based on WFormSchema
 */
export const generateBaseWFormRules = (
  schemas: WFormSchemaItem[] | ComputedRef<WFormSchemaItem[]>
) => {
  const rules = computed(() => {
    const ret: { [key: string]: ElFormItemRule[] } = {}

    const { t } = useI18n()

    const formProps = unref(schemas).map((item) => ({
      ...item.formProp,
      type: item.type,
    }))

    formProps.map(({ prop, label, type }) => {
      if (prop) {
        const actionType = ['Input', 'InputNumber'].includes(type)
          ? t('common.inputAction')
          : t('common.chooseAction')

        ret[prop] = [
          {
            required: true,
            message: t('common.rule', { label: label, type: actionType }),
          },
        ]
      }
    })

    return ret
  })

  return { rules }
}
