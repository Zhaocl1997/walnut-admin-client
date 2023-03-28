import type { CountryCallingCode, CountryCode, NationalNumber, NumberType } from 'libphonenumber-js'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

export interface WPhoneNumberInputProps {
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

export type PhoneNumberInputOption = (SelectMixedOption) & {
  name: string
  iso2: string
  dialCode: string
  priority: number
  areaCodes?: string
}

export interface PhoneNumberInputUpdateParams {
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
