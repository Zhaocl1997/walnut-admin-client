import {
  type CountryCode,
  type Examples,
  getExampleNumber,
} from 'libphonenumber-js'

let examples: Examples

export async function loadPhoneNumberExamplesFile() {
  const { default: data } = await import('libphonenumber-js/examples.mobile.json')

  examples = data
  return examples
}

export function getExamplePhoneNumber(countryCode: CountryCode) {
  return getExampleNumber(countryCode, examples)
}

export function getCurrentCountry() {
  return fetch('https://ip2c.org/s')
    .then(response => response.text())
    .then((response) => {
      const result = (response || '').toString()

      if (!result || result[0] !== '1')
        throw new Error('unable to fetch the country')

      return result.substr(2, 2)
    })
}
