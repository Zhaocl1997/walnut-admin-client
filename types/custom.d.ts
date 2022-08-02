declare global {
  // vue
  type App = import('vue').App
  type Ref<T> = import('vue').Ref<T>
  type ComputedRef<T> = import('vue').ComputedRef<T>
  type PropType<T> = import('vue').PropType<T>
  type ExtractPropTypes<T> = import('vue').ExtractPropTypes<T>
  type InjectionKey<T> = import('vue').InjectionKey<T>
  type VNode = import('vue').VNode
  type ToRefs<T> = import('vue').ToRefs<T>

  // vue-router
  type Router = import('vue-router').Router
  type _RouteRecordBase = import('vue-router')._RouteRecordBase
  type RouteRecordRaw = import('vue-router').RouteRecordRaw
  type RouteLocationRaw = import('vue-router').RouteLocationRaw
  type RouteLocationNormalized = import('vue-router').RouteLocationNormalized
  type RouteLocationNormalizedLoaded =
    import('vue-router').RouteLocationNormalizedLoaded

  // value of const
  type ValueOfAppConstDevice = import('/@/const').ValueOfAppConstDevice
  type ValueOfAppConstTabDeleteType =
    import('/@/const').ValueOfAppConstTabDeleteType
  type ValueOfAppConstDarkMode = import('/@/const').ValueOfAppConstDarkMode
  type ValueOfAppConstLocale = import('/@/const').ValueOfAppConstLocale
  type ValueOfAppConstMenuType = import('/@/const').ValueOfAppConstMenuType
  type ValueOfAppConstMenuTernal = import('/@/const').ValueOfAppConstMenuTernal
  type ValueOfAppConstPersistKey = import('/@/const').ValueOfAppConstPersistKey
  type ValueOfAppConstStorageType =
    import('/@/const').ValueOfAppConstStorageType
  type ValueOfAppConstSymbolKey = import('/@/const').ValueOfAppConstSymbolKey
  type ValueOfAppConstTransitionName =
    import('/@/const').ValueOfAppConstTransitionName
  type ValueOfAppConstCollapseMode =
    import('/@/const').ValueOfAppConstCollapseMode
  type ValueOfAppConstTabStyleMode =
    import('/@/const').ValueOfAppConstTabStyleMode
  type ValueOfAppConstLayoutMode = import('/@/const').ValueOfAppConstLayoutMode
  type ValueOfAppConstLockMode = import('/@/const').ValueOfAppConstLockMode

  // vite
  type VitePlugin = import('vite').PluginOption

  // easy-fns-ts
  type Nullable<T> = import('easy-fns-ts').Nullable<T>
  type StringOrNumber = import('easy-fns-ts').StringOrNumber
  type BaseDataType = import('easy-fns-ts').BaseDataType
  type IndexType = import('easy-fns-ts').IndexType
  type OptionDataItem<T = any> = import('easy-fns-ts').OptionDataItem<T>
  type TreeNodeItem<T = any> = import('easy-fns-ts').TreeNodeItem<T>

  // vueuse
  type MaybeRef<T> = import('@vueuse/core').MaybeRef<T>
  type MaybeComputedRef<T> = import('@vueuse/core').MaybeComputedRef<T>
  type DeepMaybeRef<T> = import('@vueuse/core').DeepMaybeRef<T>

  // App Relatives
  type BaseListParams<T = any> = import('/@/utils/axios').BaseListParams<T>
  type BaseSortParams<T = any> = import('/@/utils/axios').BaseSortParams<T>
  type BaseListResponse<T = any> = import('/@/utils/axios').BaseListResponse<T>
  type BaseResponseStructure<T = any> =
    import('/@/utils/axios').BaseResponseStructure<T>
  type AppSettings = import('./settings').AppSettings

  // echarts option
  type EChartsOption = import('echarts').EChartsOption
}

export {}
