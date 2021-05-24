import type { MaybeRef } from '/~/utils'
import type { WForm } from '../types'

import { unref, computed } from 'vue'
import { useI18n } from '/@/locales'

/**
 * @description Get rule message
 */
const getMessage = (type: string, label: string) => {
  const { t } = useI18n()

  const getType = ['Input', 'InputNumber'].includes(type)
    ? t('common.inputAction')
    : t('common.chooseAction')

  return t('common.rule', {
    type: getType,
    label,
  })
}

/**
 * @description Generate a default rules based on WFormSchema
 */
export const generateBaseWFormRules = (
  schemas: MaybeRef<WForm.Schema.Item[]>
) => {
  const rules = computed(() => {
    const ret: { [key: string]: WForm.ElForm.Rule[] } = {}

    const formProps = unref(schemas).map((item) => ({
      ...item.formProp,
      type: item.type,
    }))

    formProps.map(({ prop, label, type }) => {
      if (prop) {
        ret[prop] = [
          {
            required: true,
            message: getMessage(type, label!),
          },
        ]
      }
    })

    return ret
  })

  return { rules }
}
