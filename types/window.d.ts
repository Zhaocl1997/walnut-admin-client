import type * as ECharts from 'echarts/core'
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import type { LoadingBarApiInjection } from 'naive-ui/lib/loading-bar/src/LoadingBarProvider'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import type { NotificationApiInjection } from 'naive-ui/lib/notification/src/NotificationProvider'
import type { App } from 'vue'

declare global {
  declare interface Window {
    // Global vue app instance
    __APP__: App<Element>

    // capjs
    Cap: ICapInst
    CAP_CUSTOM_WASM_URL: string

    // naive relative
    $loadingBar: LoadingBarApiInjection
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection

    // echarts
    echarts: ECharts

    // google analytics
    gtag: any

    // baidu map
    BMap: any
    HOST_TYPE: string
    BMAP_STATUS_SUCCESS: number
    BMAP_ANCHOR_BOTTOM_RIGHT: number
  }
}
