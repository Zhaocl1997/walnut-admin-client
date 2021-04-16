### Introduction

- 这个文件夹用于存放和打包相关的工具

- icon 文件夹这里要单独讲一下。框架使用的是`iconify`的`vue3`的组件，目前均是使用`@iconify/json`提供好的`collections`使用图标，暂时用了`antd`的和一套`emoji` 的。之后会扩展更多 icon 使用方式。

  - `src/components/UI/Icon/src/utils`

    - `bundle.ts` iconify 的 json 使用`addCollection`API 来引入图标，这个文件就是最终实际打包的`collections`的图标入口。这个文件在`src/App/App.ts`中有引入。

    - `collections.ts` iconify 的 json 数组，如果想使用更多其他库的 icon，直接在这个文件引入并加入数组中即可直接使用。同时这个文件也为打包时的按需打包提供了 icon 的一个所有集合。

    - `index.ts` 里面只有一个根据`collections`生成`list`的函数，`list`是用于图标选择器的。

    - `list.ts` `list`的出口文件

    - `menu.ts` 这个是菜单里有用到的图标集合，因为是存在数据库里的东西，所以单独列了出来。

  - `build/icon`

    - `bundle.ts` iconify 官网提供的完整的打包示例，里面包括了各种方式使用图标的打包方式，暂时均被我注释了，只留下了使用数组来打包的地方。

    - `index.ts` 这个文件是

    - `list.ts` 使用`fast-glob`扫描 src 下的所有 vue 文件，搜索使用到的 icon 并写入`src/components/UI/Icon/src/utils/list.ts`中

- 讲一下打包时的总体流程

  1.  调用`build/icon/index.ts`文件，复制`src/components/UI/Icon/src/utils`下的`list.ts`和`collections.ts`文件到相同目录下

  2.  调用`build/icon/list.ts`文件，在`src/components/UI/Icon/src/utils`下写出新的`list.ts`文件用于打包

  3.  调用`build/icon/bundle.ts`文件，在`src/components/UI/Icon/src/utils`下写出新的`bundle.ts`文件用于打包

  4.  打包

  5.  打包完成后，再次调用`build/icon/index.ts`文件，还原开始打包前的`list.ts`和`bundle.ts`文件，并且删除第一步复制生成的副本

  6.  打包过程中如果出现错误，也会执行上一步的操作，以保证文件没有差错

- 这个使用`fast-glob`扫描 src 的想法，也是一下子就冒出来的点子，感觉很神奇，就去尝试做了。也没想到还比较顺利，基本流程全都跑通了。不过等之后再扩展更多的 icon 用法的时候，这些逻辑可能都要变动。

```
build
│  README.md
│  stage.ts     阶段性打包的主入口
│  types.ts     ts类型检查的主入口
│
├─icon
│      bundle.ts
│      index.ts
│      list.ts
│
├─utils
│      paths.ts     一些相关读写文件的路径
│
└─vite
    │  proxy.ts     vite proxy
    │
    └─plugin
            component.ts    自动引入组件
            compression.ts  打包压缩组件
            html.ts         ejs语法扩展
            i18n.ts         国际化插件
            index.ts
            styleImport.ts  样式按需引入
            visualizer.ts   打包可视化
            windicss.ts     windicss插件
```
