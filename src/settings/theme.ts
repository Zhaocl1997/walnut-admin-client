import { rgb2Hex } from '../utils/color'

export const defaultTheme: AppTheme = {
  light: {
    primaryColor: '#18a058',
    infoColor: '#2080f0',
    successColor: '#18a058',
    warningColor: '#f0a020',
    errorColor: '#d03050',
    bodyColor: rgb2Hex('rgb(248, 248, 248)'),
    invertedColor: '#2C3E50',
  },
  dark: {
    primaryColor: '#63e2b7',
    infoColor: '#70c0e8',
    successColor: '#63e2b7',
    warningColor: '#f2c97d',
    errorColor: '#e88080',
    bodyColor: rgb2Hex('rgb(32, 32, 32)'),
    invertedColor: 'rgb(20, 20, 20)',
  },
}
