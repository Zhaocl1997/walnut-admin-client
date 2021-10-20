import type {
  LoadingBarApiInjection,
  MessageApiInjection,
  NotificationApiInjection,
  DialogApiInjection,
} from 'naive-ui'
import type { App } from 'vue'

declare global {
  declare interface Window {
    // Global vue app instance
    __APP__: App<Element>

    // naive relative
    $loadingBar: LoadingBarApiInjection
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection
  }
}
