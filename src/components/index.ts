import type { App } from 'vue'

import {
  ElInput,
  ElInputNumber,
  ElButton,
  ElButtonGroup,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElTree,
  ElTag,
  ElCheckTag,
  ElSwitch,
  ElDialog,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElRow,
  ElCol,
  ElTooltip,
  ElPopconfirm,
  ElPopover,
  ElPagination,
  ElSpace,
  ElDivider,
  ElSlider,
  ElScrollbar,
  ElBacktop,
  ElAvatar,
  ElCard,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElAside,
  ElHeader,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/base.css'

import ElementLocale from 'element-plus/lib/locale'
import { AppI18n } from '/@/locales'

const components = [
  ElInput,
  ElInputNumber,
  ElButton,
  ElButtonGroup,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElTree,
  ElTag,
  ElCheckTag,
  ElSwitch,

  ElDialog,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElRow,
  ElCol,

  ElTooltip,
  ElPopconfirm,
  ElPopover,
  ElPagination,

  ElSpace,
  ElDivider,
  ElSlider,
  ElScrollbar,
  ElBacktop,
  ElAvatar,
  ElCard,

  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,

  ElAside,
  ElHeader,
  ElBreadcrumb,
  ElBreadcrumbItem,
]

const plugins = [ElLoading, ElMessage, ElMessageBox, ElNotification]

export const setupElementPlus = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  ElementLocale.i18n(AppI18n.global.t)
}
