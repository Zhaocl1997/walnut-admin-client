- 以下只列举到了文件夹

```
+---api                       api文件夹，暂时只有system模块
|   \---system
+---assets
|   +---images
|   |   \---auth
|   \---styles                scss文件夹，遵循7+1原则(有了windi这个用处其实不大)
|       +---abstracts
|       +---base
|       +---components
|       +---layout
|       +---pages
|       +---themes
|       \---vendors

组件核心
+---components

    App级别的组件，类似切换国际化、暗黑模式等
|   +---App
|   |   +---darkMode
|   |   \---localePicker

    帮助组件，体量很小的一些mini组件
|   +---Help
|   |   +---Arrow
|   |   +---Flipper
|   |   +---IconPicker
|   |   +---JSON
|   |   +---Message
|   |   +---Screenfull
|   |   \---Title

    UI核心组件，基于ElementPlus二次开发，优化typing支持，统一化API，扩展API
|   \---UI
|       +---Button
|       |   \---src
|       |       +---hooks
|       |       \---types
|       +---ButtonGroup
|       |   \---src
|       |       \---types
|       +---Checkbox
|       |   \---src
|       |       \---types
|       +---CheckTag
|       |   \---src
|       |       \---types
|       +---Dialog
|       |   \---src
|       |       +---hooks
|       |       \---types
|       +---Dropdown
|       |   \---src
|       |       \---types
|       +---Empty
|       |   \---src
|       |       \---types
|       +---Form
|       |   \---src
|       |       +---components
|       |       |   +---FormItem
|       |       |   |   \---src
|       |       |   |       +---hooks
|       |       |   |       \---utils
|       |       |   \---Functional
|       |       |       \---src
|       |       +---hooks
|       |       +---types
|       |       \---utils
|       +---Icon
|       |   \---src
|       |       +---types
|       |       \---utils
|       +---Input
|       |   \---src
|       |       +---hooks
|       |       \---types
|       +---InputNumber
|       |   \---src
|       |       \---types
|       +---Pagination
|       |   \---src
|       |       \---types
|       +---Radio
|       |   \---src
|       |       \---types
|       +---Scrollbar
|       |   \---src
|       |       +---hooks
|       |       \---types
|       +---Select
|       |   \---src
|       |       \---types
|       +---SelectTree
|       |   \---src
|       |       +---hooks
|       |       \---types
|       +---Table
|       |   \---src
|       |       +---components
|       |       |   +---Columns
|       |       |   |   +---action
|       |       |   |   +---expand
|       |       |   |   +---index
|       |       |   |   \---select
|       |       |   \---TableItem
|       |       |       \---src
|       |       +---hooks
|       |       +---types
|       |       \---utils
|       \---Tree
|           \---src
|               +---hooks
|               +---types
|               \---utils

全局指令
+---directives

全局enum
+---enums

全局hook
+---hooks
|   +---component
|   \---core

layout布局
+---layout
|   +---default
|   |   +---TheAside
|   |   |   \---src
|   |   +---TheContent
|   |   |   \---src
|   |   +---TheHeader
|   |   |   \---src
|   |   +---TheParent
|   |   |   \---src
|   |   +---TheRedirect
|   |   \---TheTab
|   |       \---src
|   |           +---components
|   |           +---hooks
|   |           +---types
|   |           \---utils
|   \---iframe

国际化
+---locales
|   \---lang
|       +---en
|       |   +---component
|       |   +---layout
|       |   \---system
|       \---zh_CN
|           +---component
|           +---layout
|           \---system

路由
+---router
|   \---guard

状态
+---store
|   \---modules

工具
+---utils
|   +---auth
|   +---axios
|   |   \---src
|   +---constant
|   +---crypto
|   |   \---src
|   +---factory
|   \---persistent
|       \---src

视图
\---views
    +---auth
    +---demo
    |   +---base
    |   +---dialog
    |   +---form
    |   +---help
    |   \---table
    +---error
    |   \---404
    +---index
    \---system
        +---menu
        \---user
```
