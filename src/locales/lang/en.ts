import { LocaleEnum } from '/@/enums/locale'
import { getLocaleMessages } from '/@/locales/utils'
import enLang from 'element-plus/lib/locale/lang/en'

export default Object.assign(getLocaleMessages(LocaleEnum.EN), {
  el: enLang.el,
})
