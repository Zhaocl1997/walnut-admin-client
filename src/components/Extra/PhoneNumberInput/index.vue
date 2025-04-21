<script lang="tsx" setup>
import type { CountryCode } from 'libphonenumber-js'
import type { InputInst } from 'naive-ui'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import type { ICompExtraPhoneNumberInputProps, ICompExtraPhoneNumberInputUpdateParams } from '.'
import { getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import { getExamplePhoneNumber, phoneNumberExample } from './utils'

defineOptions({
  name: 'WCompExtraPhoneNumberInput',
})

const props = withDefaults(defineProps<ICompExtraPhoneNumberInputProps>(), {
  flag: true,
  countrySelect: true,
  preferred: false,
  disabled: false,
  example: false,
  autoDefaultCountry: false,
})

const emits = defineEmits<{ change: [params: ICompExtraPhoneNumberInputUpdateParams] }>()

const value = defineModel<MaybeNullOrUndefined<string>>('value', { required: true })
const countryCode = defineModel<CountryCode>('countryCode', { default: 'CN' })

const { t } = useAppI18n()

const inputRef = shallowRef<InputInst>()
const inputFocus = ref(false)

// loading example json and get input placeholder
watch(() => props.example, async (v) => {
  if (v) {
    await getExamplePhoneNumber()
  }
}, { immediate: true })
const getInputPlaceholder = computed(() => {
  if (countryCode.value && props.example && phoneNumberExample.value) {
    const res = getExampleNumber(countryCode.value, phoneNumberExample.value)
    const formatted = parsePhoneNumberFromString(res!.nationalNumber, countryCode.value)
    return formatted?.formatNational()
  }

  return t('comp.phoneNumberInput.placeholder')
})

// get input status based on input phone number valid or not
const getInputStatus = computed<FormValidationStatus | undefined>(() => {
  if (!inputFocus.value || !value.value)
    return

  const parsed = parsePhoneNumberFromString(value.value!, countryCode.value)
  if (parsed?.isValid())
    return 'success'
  else
    return 'warning'
})

const getSelectSpan = computed(() => {
  return props.countrySelect ? props.flag ? 10 : 8 : 0
})

const getInputSpan = computed(() => {
  return props.countrySelect ? props.flag ? 14 : 16 : 24
})

function onUpdateSelectValue() {
  value.value = ''
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// only number input
function onAllowInput(v: string) {
  // TODO make this built inside input => only number
  const r1 = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]+$/g
  const r2 = /[a-z]+$/gi

  if (r1.test(v) || r2.test(v))
    return false

  return true
}

function onInputFocus() {
  inputFocus.value = true
}

function onInputBlur() {
  inputFocus.value = false
}

function onUpdateInputValue(v: string) {
  const parsed = parsePhoneNumberFromString(v, countryCode.value)

  emits('change', {
    isValid: parsed?.isValid() ?? false,
    isPossible: parsed?.isPossible(),
    countryCode: parsed?.country,
    countryCallingCode: parsed?.countryCallingCode,
    nationalNumber: parsed?.nationalNumber,
    type: parsed?.getType(),
    formatInternational: parsed?.formatInternational(),
    formatNational: parsed?.formatNational(),
    uri: parsed?.getURI(),
    e164: parsed?.format('E.164'),
    rfc3966: parsed?.format('RFC3966'),
  })
}
</script>

<template>
  <div>
    <n-grid :cols="24">
      <n-gi v-if="countrySelect" :span="getSelectSpan">
        <WCountryCallingSelect
          v-model:value="countryCode"
          :disabled="disabled"
          :flag="flag"
          :preferred="preferred"
          :auto-default-country="autoDefaultCountry"
          :white-list="whiteList"
          :black-list="blackList"
          @update:value="onUpdateSelectValue"
        />
      </n-gi>

      <n-gi :span="getInputSpan">
        <n-input
          ref="inputRef"
          v-model:value="value"
          :input-props="{ type: 'tel', name: 'phoneNumber', autocomplete: 'on', required: true }"
          :status="getInputStatus"
          :disabled="disabled"
          clearable
          :placeholder="getInputPlaceholder"
          :allow-input="onAllowInput"
          @update:value="onUpdateInputValue"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
      </n-gi>
    </n-grid>
  </div>
</template>
