import type { App } from 'vue'
import { ClickOutside } from './clickOutside'

export const setupDirectives = (app: App) => {
  app.directive('clickOutside', ClickOutside)
}
