import { LocaleEnum } from '/@/enums/locale'
import { getLocaleMessages } from '/@/locales/utils'
import zhLang from 'element-plus/lib/locale/lang/zh-cn'

export default Object.assign(getLocaleMessages(LocaleEnum.ZH_CN), {
  el: zhLang.el,
})
