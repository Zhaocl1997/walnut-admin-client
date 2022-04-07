<!-- PROJECT LOGO -->
<p align="center">
  <!-- <a href="">
    <img src="https://github.com/Zhaocl1997/walnut-admin-client/blob/main/src/assets/images/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">Walnut Admin</h1>
  <p align="center">
    面向开发者的中后台管理系统模板
    <br />
    <a href="https://walnut-admin-doc.netlify.app/"><strong>探索本项目的文档 »</strong></a>
    <!-- <br />
    <br />
    <a href="https://github.com/shaojintian/Best_README_template">查看Demo</a>
    ·
    <a href="https://github.com/shaojintian/Best_README_template/issues">报告Bug</a>
    ·
    <a href="https://github.com/shaojintian/Best_README_template/issues">提出新特性</a> -->
  </p>

</p>

## 序言

Walnut Admin, 一个开源的、持续优化的中后台管理系统模板。重点是前台，后台和数据库仅供学习！现仍在开发阶段中。技术栈使用了 `Vue3`, `NaiveUI`, `Vite2`, `TypeScript`, `VueUse`, `pnpm`, `unocss` 等, 用于学习和交流！

项目跑起来需要[后台][walnut-admin-server]，是 [NestJS][nestjs-url] 的一个最基本的框架。数据库用的 mongo。更多信息可查看文档。


### 接下来的计划  

- [ ] long vue-tsc 错误全部消除  
- [ ] long layout 扩展 
- [ ] long 主题扩展
- [ ] long 打包优化+自动化部署
- [ ] long easy-fns-ts 类型优化
- [ ] long 后台自定义code
- [ ] long 后台入参校验
- [ ] long 登录日志/操作日志
- [ ] long 第三方认证/注册/找回密码
- [ ] long 模拟各种返回状态的demo页面（就一堆按钮，模拟自定义的各种状态下的错误）
- [ ] long 错误捕捉模块
- [ ] long 前端监控
- [ ] long 权限模块开发

- [ ] 999 查看[issue](https://github.com/vuejs/vue-router-next/issues/626)。嵌套路由的keep-alive有问题，为了暂时让keep-alive好使，就把路由扁平化了。但是左侧menu和头部的breadcrumb需要做相应的变动（路由不再是树状结构，但在左侧菜单和面包屑的位置逻辑还是原来树状的逻辑）

- [ ] 888 查看[issue](https://github.com/vuejs/core/issues/4294)。项目中组件的props的类型定义都在vue的文件的外部，引入并使用到defineProps上会导致编译错误，暂时为了解决问题，都在组件内部又重新定义了一遍props的类型，后续支持了就可以从外部文件引入类型了。

- [ ] 99 tsx + setup + auto-import 打包后会出问题，暂时需要显式引入 [issue](https://github.com/antfu/unplugin-auto-import/issues/75)
- [x] 98 data-table pagination onUpdatePage触发两次 [issue](https://github.com/TuSimple/naive-ui/issues/1666)
- [ ] 97 icon 使用unocss重构，同时扩展iconify提供的多种使用icon的方式 [issue](https://github.com/antfu/unocss)
- [x] 96 keep-alive router 设计貌似有问题，需要重做
- [ ] 95 global comp auto gen 的类型地址有问题

### 更新日志

请阅读[CHANGELOG.md](https://github.com/Zhaocl1997/walnut-admin-client/blob/main/CHANGELOG.md) 查阅为该项目的更新日志。

### 项目架构

请阅读[ARCHITECTURE.md](https://github.com/Zhaocl1997/walnut-admin-client/blob/main/ARCHITECTURE.md) 查阅为该项目的架构。


### 作者

[zhaocl1997][author-url]

### 版权说明

该项目签署了 MIT 授权许可，详情请参阅 [LICENSE][license-url]

### 鸣谢

- [Vue Vben Admin][vben-url]

<!-- links -->

[author-url]: https://github.com/Zhaocl1997
[walnut-admin-client]: https://github.com/Zhaocl1997/walnut-admin-client
[walnut-admin-server]: https://github.com/Zhaocl1997/walnut-admin-server
[license-url]: https://github.com/Zhaocl1997/walnut-admin-client/blob/main/LICENSE

[vben-url]: https://github.com/anncwb/vue-vben-admin
[nestjs-url]: https://docs.nestjs.com/
