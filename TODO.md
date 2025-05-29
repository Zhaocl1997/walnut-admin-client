## TODOS

- 重要紧急

  - [x] 弹出类的form做表单内容改变关闭提示
  - [ ] menu字段：usedDict
  - [x] 移除所有eslint/ts error
  - [x] 已经缓存了的页面不要loadingbar
  - [ ] 示例模块，设备模块，删除模块，认证模块
  - [x] lock security 有问题
  - [ ] 修改密码功能
  - [ ] 个人信息页面
  - [ ] 强退在线用户(修改密码/重置密码都会提出当前在线的用户)
  - [x] vue3-mindmap，能帮忙捋捋思路
  - [ ] 菜单内嵌params和query，以及手动跳转的query的留存(param设计的就是刷新就没有，所以这里就不做存留了)
  - [ ] 用户表加一个字段，角色是分开模式还是合并模式，都可以自定义，同时如果是分开模式，右上角配合选择切换权限
  - [ ] 用户查看，完善抽屉，同时手机号/邮箱作为敏感信息，都需要单独处理
  - [x] 路由加密，单独指query，param感觉没有加密的必要?
  - [ ] 找回密码

- 重要不紧急

  - [x] 999 查看[issue](https://github.com/vuejs/vue-router-next/issues/626)。嵌套路由的keep-alive有问题，为了暂时让keep-alive好使，就把路由扁平化了。但是左侧menu和头部的breadcrumb需要做相应的变动（路由不再是树状结构，但在左侧菜单和面包屑的位置逻辑还是原来树状的逻辑）
  - [x] ~~888 查看[issue](https://github.com/vuejs/core/issues/4294)。项目中组件的props的类型定义都在vue的文件的外部，引入并使用到defineProps上会导致编译错误，暂时为了解决问题，都在组件内部又重新定义了一遍props的类型，后续支持了就可以从外部文件引入类型了。~~
  - [ ] 000 /* @vue-ignore */ ugly
  - [ ] 111 tsx explict import
  - [x] axios config demo
  - [ ] 页面中的错误模拟 demo
  - [ ] rrweb
  - [ ] pdf/word/excel/print.js plugin
  - [ ] error monitor (femonitor-web)
  - [x] untyper
  - [ ] closure-compiler (尝试搞过，难搞)
  - [ ] markdown (vditor)
  - [ ] fullcalendar
  - [ ] 拆分面板 splitpanes
  - [ ] tiptap 替代 tinymce?

- 不重要不紧急

  - [x] 打包优化+自动化部署
  - [x] 第三方认证
  - [x] case police
  - [x] 菜单 自定义动画/记住滚动位置/页面离开提示(路由和全局)
  - [x] 动态设置tab的名称，图标，badge, 进入之前的路由钩子处理
  - [x] 输入框的定制插槽 - 复制
  - [ ] vue-tsc 错误全部消除
  - [ ] layout 扩展
  - [ ] 主题扩展
  - [x] 手机号组件，邮箱填充组件，身份证组件

- 不重要紧急

  - [x] 后台自定义code
  - [x] 后台入参校验
  - [x] 登录日志/操作日志
  - [x] 权限模块开发
  - [x] hover css
  - [x] tab样式重做
  - [x] 劫持F5事件
  - [ ] 搜索组件
  - [ ] 99 tsx + setup + auto-import 打包后会出问题，暂时需要显式引入 [issue](https://github.com/antfu/unplugin-auto-import/issues/75)
