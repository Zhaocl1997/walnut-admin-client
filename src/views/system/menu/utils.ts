import { useI18n } from '/@/locales'

// https://stackoverflow.com/questions/47062922/how-to-get-all-keys-with-values-from-nested-objects
export const deepKeys = function* (t: Recordable, pre: any[] = []): Generator {
  if (Array.isArray(t)) return
  else if (Object(t) === t)
    for (const [k, v] of Object.entries(t)) yield* deepKeys(v, [...pre, k])
  else yield { value: pre.join('.'), label: t }
}

/**
 * @description Dummy way to get real message.
 */
export const getMaybeI18nMsg = (field: string | undefined) => {
  const { t } = useI18n()
  return field && field.includes('.') ? t(field!) : field
}
