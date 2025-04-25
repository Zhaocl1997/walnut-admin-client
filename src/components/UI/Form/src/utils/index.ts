import type { FormItemRule } from 'naive-ui'
import type { WForm } from '../types'
import { defaultAppLocaleMessageKeys } from '../../../shared'
import { componentMap } from '../components/FormItem/componentMap'

export const formItemUtils = {
  getTargetComponent<T>(item: WForm.Schema.Item<T>) {
    return componentMap.get(item?.type.split(':')[1])
  },

  getIfOrShowBooleanValue<T>(item: WForm.Schema.Item<T>, props: WForm.Props<T>, field: WForm.MaybeBooleanField, defaultValue = true) {
    const maybeBool = item?.extraProp?.[field]

    if (typeof maybeBool === 'function')
      return maybeBool({ formData: props.model! })

    return getBoolean(toRaw(maybeBool), defaultValue)
  },

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
export function generateRuleMessage(t: Fn, p: ComputedRef<WForm.Props>, i: WForm.Schema.Item) {
  return t('comp.form.rule', {
    type: inputFormItemTypeList.includes(i.type)
      ? t('comp.base.input')
      : t('comp.base.choose'),
    label: formItemUtils.getTranslatedString(t, i, p),
  })
}

/**
 * @description generate base rules based on schemas
 */
export function generateBaseRules(t: Fn, schemas: WForm.Schema.Item[], props: ComputedRef<WForm.Props>) {
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
        message: generateRuleMessage(t, props, i),
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
      ?.map<[string, BaseDataType | BaseDataType[] | null]>(i => [
        i?.formProp?.path!,
        i?.componentProp?.defaultValue ?? null,
      ])
      .filter(i => i[0])!,
  )
}

export function generateFormItemId(item: WForm.Schema.Item, index: number) {
  return wbtoa(`${item.type}-${index}-${item?.formProp?.path}`)
}
