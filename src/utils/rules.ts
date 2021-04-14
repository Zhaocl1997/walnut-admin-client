import { computed, ComputedRef } from 'vue'
import type { WFormItemRule, WFormSchemaItem } from '../components/UI/Form'

import { upperFirst } from 'easy-fns-ts'
import { unref } from 'vue'
import { useI18n } from '/@/locales'

/**
 * @description Generate a default rules based on WFormSchema
 */
export const generateBaseWFormRules = (
  schemas: WFormSchemaItem[] | ComputedRef<WFormSchemaItem[]>
): { rules: WFormItemRule[] | ComputedRef<WFormItemRule[]> } => {
  const rules = computed(() => {
    const ret: any = {}

    const { t } = useI18n()

    const propKeys = unref(schemas).map((item) => item.formProp?.prop)

    propKeys.map((key: any) => {
      ret[key] = [
        {
          required: true,
          message: t('common.rule', { prop: upperFirst(key) }),
        },
      ]
    })

    return ret
  })

  return { rules }
}
