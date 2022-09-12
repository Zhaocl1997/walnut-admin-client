/**
 * Curries a predicate function to check if value matches pattern.
 * @param {RegExp} pattern
 * @returns {(value: string) => boolean}
 */
const isPattern = (pattern: RegExp) => (value: string) => pattern.test(value)

const phoneRegex =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const CSSLengthRegex =
  /^\+?(\d*\.)?\d+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i
const CSSTimeRegex = /^\+?(\d*\.)?\d+(ms|s)$/i

export const isPhoneNumber = isPattern(phoneRegex)

export const isEmailAddress = isPattern(emailRegex)

export const isCSSLength = isPattern(CSSLengthRegex)

export const isCSSTime = isPattern(CSSTimeRegex)
