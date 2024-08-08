<script lang="tsx" setup>
import type { InputInst, SelectFilter, SelectRenderTag } from 'naive-ui'
import type { CountryCallingCode, CountryCode, NationalNumber, NumberType } from 'libphonenumber-js'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import type { PhoneNumberInputOption } from './types'
import options from './data'
import { getCurrentCountry, getExamplePhoneNumber, loadPhoneNumberExamplesFile } from './utils'
import './icon.css'

defineOptions({
  name: 'WPhoneNumberInput',
})

const props = withDefaults(defineProps<InternalProps>(), {
  countryCode: 'CN',
  flag: true,
  countrySelect: true,
  preferred: false,
  disabled: false,
  example: false,
  autoDefaultCountry: false,
})

const emits = defineEmits<{ (e: 'update:value', value: string): void, (e: 'update', value: UpdateParams): void }>()

// TODO 888
interface InternalProps {
  value?: string
  countryCode?: CountryCode
  flag?: boolean
  countrySelect?: boolean
  preferred?: boolean
  disabled?: boolean
  example?: boolean
  whiteList?: CountryCode[]
  blackList?: CountryCode[]
  autoDefaultCountry?: boolean
}

// TODO 888
interface UpdateParams {
  isValid: boolean
  isPossible?: boolean
  countryCode?: CountryCode
  countryCallingCode?: CountryCallingCode
  nationalNumber?: NationalNumber
  type?: NumberType
  formatInternational?: string
  formatNational?: string
  uri?: string
  e164?: string
  rfc3966?: string
}

const { t } = useAppI18n()
const { isOnline } = useSharedNetwork()
const { language } = useSharedNavigatorLanguage()

const inputRef = ref<InputInst>()
const _countryCode = ref()
const _phoneNumber = ref()
const _example = ref()
const loadExamples = ref(false)
const inputFocus = ref(false)
const selectLoading = ref(false)

const filterOptions = computed(() => {
  if (props.whiteList?.length)
    return options.filter(({ iso2 }) => props.whiteList!.some(c => c.toUpperCase() === iso2))

  if (props.blackList?.length) {
    return options.filter(({ iso2 }) => !props.blackList!.includes(iso2.toUpperCase())
      && !props.blackList!.includes(iso2.toLowerCase()))
  }

  return options
})

const sortOptions = computed<SelectMixedOption[]>(() => {
  if (props.preferred) {
    const regions = window.navigator.languages.map(i => new Intl.Locale(i).region)
    const preferred = filterOptions.value.filter(i => regions.includes(i.iso2))

    return [
      {
        type: 'group',
        name: t('app.base.preferred'),
        iso2: '999999',
        children: preferred,
      },
      {
        type: 'group',
        name: t('app.base.all'),
        iso2: '000000',
        children: filterOptions.value.filter(i => !regions.includes(i.iso2)),
      },
    ]
  }

  return filterOptions.value
})

const _dialCode = computed(() => getCountryCallingCode(_countryCode.value))

const inputPlaceholder = computed(() => {
  if (props.example)
    return _example.value

  return t('comp.phoneNumberInput.placeholder')
})

const inputStatus = computed<FormValidationStatus | undefined>(() => {
  if (!inputFocus.value || !props.value)
    return

  const parsed = parsePhoneNumberFromString(props.value!, _countryCode.value)
  if (parsed?.isValid())
    return 'success'
  else
    return 'warning'
})

const selectSpan = computed(() => {
  return props.countrySelect ? props.flag ? 10 : 8 : 0
})

const inputSpan = computed(() => {
  return props.countrySelect ? props.flag ? 14 : 16 : 24
})

function onRenderLabel(option: PhoneNumberInputOption): VNodeChild {
  if (option?.type === 'group')
    return <div>{option.name}</div>

  return (
    <div class="grid grid-cols-12 w-48 items-center gap-x-1" title={option.name}>
      {props.flag && (
        <div class="col-span-2">
          <div class={['w-flag', `w-flag-${(option.iso2).toLowerCase()}`]}></div>
        </div>
      )}
      <div class="col-span-3">
        +
        {option.dialCode}
      </div>
      <div class="col-span-auto">{option.name}</div>
    </div>
  )
}

// @ts-expect-error
const onRenderTag: SelectRenderTag = ({ option }: { option: PhoneNumberInputOption }) => {
  return (
    <div class="grid grid-cols-12 items-center gap-x-1" title={option.name}>
      {props.flag && (
        <div class="col-span-5">
          <div class={['w-flag', `w-flag-${option.iso2.toLowerCase()}`]}></div>
        </div>
      )}
      <div class="col-span-7">
        +
        {option.dialCode}
      </div>
    </div>
  )
}

// @ts-expect-error
const onFilter: SelectFilter = (pattern: string, option: PhoneNumberInputOption) => {
  const filterableFields = ['name', 'iso2', 'dialCode']

  if (filterableFields.some(i => (option[i] as string).toLowerCase().includes(pattern.toLowerCase())))
    return true

  return false
}

function onUpdateSelectValue(v: string) {
  _countryCode.value = v
  _phoneNumber.value = ''
  emits('update:value', '')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// only number input
function onAllowInput(v: string) {
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
  const parsed = parsePhoneNumberFromString(v, _countryCode.value)
  _phoneNumber.value = parsed?.formatNational()

  emits('update:value', v)

  emits('update', {
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

// get the example from `linphonenumber-js`
watch(() => _countryCode.value, async (v) => {
  if (v && props.example) {
    if (!loadExamples.value) {
      await loadPhoneNumberExamplesFile()
      loadExamples.value = true
    }
    const res = getExamplePhoneNumber(v)!
    const formatted = parsePhoneNumberFromString(res.nationalNumber, v)
    _example.value = formatted?.formatNational()
  }
}, { immediate: true })

// auto detect user country code
// if user has internet connect, fetch the result from https://ip2c.org/s
// no internet, use `navigator.language` and new `Intl.Locale` to get the `region` as country code
// also when no internet, user change the browser language, the country code change reactively
watch(() => [props.autoDefaultCountry, isOnline.value, language.value], async () => {
  if (props.autoDefaultCountry || !props.countrySelect) {
    if (isOnline.value) {
      selectLoading.value = true
      try {
        const res = await getCurrentCountry()
        _countryCode.value = res.toUpperCase()
      }
      finally {
        selectLoading.value = false
      }
    }
    else {
      const locale = new Intl.Locale(language.value!)
      _countryCode.value = locale.region
    }
  }
  else {
    _countryCode.value = props.countryCode
  }
}, { immediate: true, deep: true })

onMounted(async () => {
  if (props.value) {
    const res = parsePhoneNumberFromString(props.value, props.countryCode)

    _countryCode.value = res?.country
    _phoneNumber.value = res?.nationalNumber

    onUpdateInputValue('')
  }
})
</script>

<template>
  <div>
    <n-grid :cols="24">
      <n-gi v-if="countrySelect" :span="selectSpan">
        <n-select
          :value="_countryCode" :loading="selectLoading" :disabled="disabled" :options="sortOptions" value-field="iso2" filterable :filter="onFilter"
          :placeholder="$t('app.base.countryCode')" :render-label="onRenderLabel" :render-tag="onRenderTag"
          :menu-props="{ style: 'width: 250px !important' }" @update:value="onUpdateSelectValue"
        />
      </n-gi>

      <n-gi :span="inputSpan">
        <n-input
          ref="inputRef" :input-props="{ type: 'tel', name: 'phoneNumber', autocomplete: 'on', required: true }" :status="inputStatus" :disabled="disabled" clearable :placeholder="inputPlaceholder" :value="_phoneNumber" :allow-input="onAllowInput"
          @update:value="onUpdateInputValue" @focus="onInputFocus" @blur="onInputBlur"
        />
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped></style>
