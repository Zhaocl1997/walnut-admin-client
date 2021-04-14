import { LocaleEnum } from '/@/enums/locale'
import { getLocaleMessages } from '/@/locales/utils'
import enLang from 'element-plus/lib/locale/lang/en'

export default {
  [LocaleEnum.EN]: Object.assign(
    getLocaleMessages(LocaleEnum.EN)[LocaleEnum.EN],
    { el: enLang.el }
  ),
}
