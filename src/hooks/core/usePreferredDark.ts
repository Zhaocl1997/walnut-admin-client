import { useMediaQuery } from './useMediaQuery'

export const usePreferredDark = () => {
  return useMediaQuery('(prefers-color-scheme: dark)')
}
