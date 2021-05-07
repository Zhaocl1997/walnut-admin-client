import type { IMessageOptions } from 'element-plus/lib/el-message/src/types'
import type { ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type'
import type { INotificationOptions } from 'element-plus/lib/el-notification/src/notification.type'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/message#options
 */
export const useMessage = (opt: IMessageOptions) => {
  return ElMessage(opt)
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/message-box#options
 */
export const useMessageBox = (opt: ElMessageBoxOptions) => {
  return ElMessageBox(opt)
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/notification#options
 */
export const useNotification = (opt: INotificationOptions) => {
  return ElNotification(opt)
}
