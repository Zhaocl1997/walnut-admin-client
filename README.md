<!-- PROJECT LOGO -->
<p align="center">
  <!-- <a href="">
    <img src="https://github.com/Zhaocl1997/walnut-admin-client/blob/main/src/assets/images/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">Walnut Admin</h1>
  <p align="center">
    面向开发者的中后台管理系统模板
    <br />
    <a href=""><strong>探索本项目的文档(暂无) »</strong></a>
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

Walnut Admin, 一个开源的、持续优化的中后台管理系统模板。主要是前台，后台和数据库仅供学习！现仍在开发阶段中。技术栈使用了 `Vue3`, `ElementPlus`, `Vite2`, `Typescript` 等, 用于学习和交流！

QQ: 674351624, 如果感兴趣的人多会建群。现在项目设计思路真的很多，时间真的很少，开始设计也是发现问题连篇。有很多已经实现的设计思路也想分享出来。就看看有没有人感兴趣吧。
项目跑起来需要[后台][walnut-admin-server]，是 [NestJs][nestjs-url] 的一个最基本的框架，接口权限部分还没实现。数据库用的 mongo，目前初始化需要用户(user)和菜单(menu)两个 collection。

## 目录

- [上手指南](#上手指南)
  - [推荐环境与配置](#推荐环境与配置)
  - [安装步骤](#安装步骤)
- [开发的架构](#开发的架构)
- [更新日志](#更新日志)
- [部署](#部署)
- [使用到的技术](#使用到的技术)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

##### 推荐环境与配置

- 以下是本人环境，node版本应该不低于12

1. os : win10 pro
2. node : 14.15.1
3. npm : 7.7.5
4. git : 2.27.0

##### 安装步骤

```sh
git clone https://github.com/Zhaocl1997/walnut-admin-client.git
```

```sh
cd walnut-admin-client
```

```
npm i
```

### 开发的架构

请阅读[ARCHITECTURE.md](https://github.com/Zhaocl1997/walnut-admin-client/blob/main/ARCHITECTURE.md) 查阅为该项目的架构。


### 更新日志

请阅读[CHANGELOG.md](https://github.com/Zhaocl1997/walnut-admin-client/blob/main/CHANGELOG.md) 查阅为该项目的更新日志。

### 部署

暂无

### 使用到的技术

- [vue3][vue3-url]
- [vite][vite-url]
- [elementPlus][ele-url]
- [typescript][ts-url]
- ...


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

[vue3-url]: https://v3.cn.vuejs.org/
[vite-url]: https://vitejs.dev/
[ele-url]: https://element-plus.gitee.io/#/zh-CN
[nestjs-url]: https://docs.nestjs.com/
[ts-url]: https://www.typescriptlang.org/

[vben-url]: https://github.com/anncwb/vue-vben-admin
