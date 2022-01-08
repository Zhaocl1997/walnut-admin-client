import { rgb2Hex } from '../utils/color'

export const defaultTheme: AppTheme = {
  light: {
    primaryColor: '#18a058',
    infoColor: '#2080f0',
    warningColor: '#f0a020',
    errorColor: '#d03050',
    bodyColor: rgb2Hex('rgb(232, 232, 232)'),
  },
  dark: {
    primaryColor: '#63e2b7',
    infoColor: '#70c0e8',
    warningColor: '#f2c97d',
    errorColor: '#e88080',
    bodyColor: rgb2Hex('rgb(36, 36, 36)'),
  },
}
