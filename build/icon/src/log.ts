import { BuildUtilsLog } from '../../utils'

export function IconLog(title: string, data: string) {
  BuildUtilsLog(
    `
/**
 * ==============================================
 * ===============   ${title}  ==================
 * ==============================================
 * ${data}
 * ==============================================
 */
`,
  )
}
