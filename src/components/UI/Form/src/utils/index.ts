import type { FormItemRule } from 'naive-ui'
import type { WForm } from '../types'
import { defaultAppLocaleMessageKeys } from '../../../shared'
import { componentMap } from '../components/FormItem/componentMap'

export const formItemUtils = {

  /**
   * @description get dynamic component from componentMap
   */
  getTargetComponent<T>(item: WForm.Schema.Item<T>) {
    return componentMap.get(item?.type.split(':')[1])
  },

  /**
   * @description get v-if/v-show value from extraProp
   */
  getIfOrShowBooleanValue<T>(item: WForm.Schema.Item<T>, props: WForm.Props<T>, field: WForm.MaybeBooleanField, defaultValue = true) {
    const maybeBool = item?.extraProp?.[field]

    if (typeof maybeBool === 'function')
      return maybeBool({ formData: props.model! })

    return getBoolean(toRaw(maybeBool), defaultValue)
  },

  /**
   * @description get v-if/v-show value from extraProp
   */
  getScopeOrGlobalProp<T>(item: WForm.Schema.Item<T>, props: WForm.Props<T>, field: WForm.ScopeOrGlobalField) {
    return item?.extraProp?.[field] ?? props[field]
  },

  /**
   * @description generate form item based on item & index
   */
  generateFormItemId<T>(item: WForm.Schema.Item<T>, index: number) {
    return wbtoa(`${item.type}-${index}-${item?.formProp?.path}`)
  },

  /**
   * @description get translated string relatived with form
   */
  getTranslatedString<T>(t: Fn, item: WForm.Schema.Item<T>, props: WForm.Props<T>, type: WForm.LocaleType = 'origin') {
    const itemFormProp = item.formProp!

    // used for dict form item
    if (itemFormProp.label === true)
      return

    // used for desc form item
    if (!getBoolean(item?.descriptionProp?.show))
      return

    // locale unique key
    const key = props.localeUniqueKey

    const needLocale = key && getBoolean(itemFormProp.locale)

    const path = itemFormProp.path
    const label = itemFormProp.label

    // TODO for what??
    // got label, return label
    // if (label)
    //   return unref(label)

    // no locale nor no path
    // just return target field
    if (!needLocale || !path) {
      if (type === 'origin')
        return label
      if (type === 'helpMsg')
        return itemFormProp.labelHelpMessage
      if (type === 'placeholder')
        return item.componentProp?.placeholder
      return
    }

    // in default app locale messages keys
    if (defaultAppLocaleMessageKeys.includes(path))
      return t(`app.base.${path}`)

    const isLocaleWithTable
      = getBoolean(itemFormProp.localeWithTable)
        && getBoolean(props.localeWithTable)

    const format = (key: string) => {
      if (type === 'origin')
        return key
      if (type === 'helpMsg')
        return `${key}.helpMsg`
      if (type === 'placeholder')
        return `${key}.PH`
      if (type === 'rule')
        return `${key}.rule`
    }

    // locale with table, means locale key startsWith `table` insteadof `form`
    if (isLocaleWithTable)
      return t(`table.${format(`${key}.${path}`)}`)

    return t(`form.${format(`${key}.${path}`)}`)
  },

}

/**
 * @description form item type that need to show `input` something
 */
export const inputFormItemTypeList = [
  'Base:Input',
  'Base:InputNumber',
  'Extra:Password',
  'Extra:SMSInput',
]

/**
 * generate different default rule message through based on `inputFormItemTypeList`
 */
export function generateRuleMessage<T>(t: Fn, i: WForm.Schema.Item<T>, p: ComputedRef<WForm.Props<T>>) {
  return t('comp.form.rule', {
    type: inputFormItemTypeList.includes(i.type)
      ? t('comp.base.input')
      : t('comp.base.choose'),
    label: formItemUtils.getTranslatedString(t, i, p.value),
  })
}

/**
 * @description generate base rules based on schemas
 */
export function generateBaseRules<T>(t: Fn, schemas: WForm.Schema.Item<T>[], props: ComputedRef<WForm.Props<T>>) {
  const getBaseRuleObj = (
    i: WForm.Schema.Item,
    extra?: FormItemRule[],
  ): FormItemRule[] => {
    const base: FormItemRule[] = [
      {
        key: i?.formProp?.path,
        type: i.formProp?.ruleType || 'any',
        trigger: ['change', 'input'],
        required: true,
        message: generateRuleMessage<T>(t, i, props),
      },
    ]

    return extra ? base.concat(extra) : base
  }

  return Object.fromEntries(
    schemas
      .map((i) => {
        if (i.formProp?.path && i.formProp?.rule !== false) {
          return [
            i.formProp.path,
            i.formProp.rule
              ? getBaseRuleObj(
                  i,
                  (Array.isArray(i.formProp.rule)
                    ? i.formProp.rule
                    : [i.formProp.rule]) as FormItemRule[],
                )
              : getBaseRuleObj(i),
          ]
        }
        return []
      })
      .filter(i => i.length !== 0),
  )
}

export function extractDefaultFormDataFromSchemas(schemas: WForm.Schema.Item[]) {
  if (!schemas)
    return {}

  return Object.fromEntries(
    unref(schemas)
      .filter(i => !i.formProp?.path)
      .map<[string, WForm.Schema.DefaultValue]>(i => [
        i.formProp?.path ?? '',
        i?.componentProp?.defaultValue ?? null,
      ]),
  )
}
