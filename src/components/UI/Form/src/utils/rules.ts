import { ComputedRef } from 'vue'
import type { ElFormItemRule, WFormSchemaItem } from '../types'

import { upperFirst } from 'easy-fns-ts'
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

    const propKeys = unref(schemas).map((item) => item.formProp?.prop)

    propKeys.map((key: string | undefined) => {
      if (key) {
        ret[key] = [
          {
            required: true,
            message: t('common.rule', { prop: upperFirst(key) }),
          },
        ]
      }
    })

    return ret
  })

  return { rules }
}
