import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import type { LoadingBarApiInjection } from 'naive-ui/lib/loading-bar/src/LoadingBarProvider'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import type { NotificationApiInjection } from 'naive-ui/lib/notification/src/NotificationProvider'
import type { ECharts } from 'echarts'

declare global {
  declare interface Window {
    // Global vue app instance
    __APP__: App<Element>

    // naive relative
    $loadingBar: LoadingBarApiInjection
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection

    echarts: ECharts
  }
}
