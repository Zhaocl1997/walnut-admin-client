import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import { LoadingBarApiInjection } from 'naive-ui/lib/loading-bar/src/LoadingBarProvider'
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { NotificationApiInjection } from 'naive-ui/lib/notification/src/NotificationProvider'
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
