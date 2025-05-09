declare global {
  // vue
  type App = import('vue').App
  type ExtractPropTypes<T> = import('vue').ExtractPropTypes<T>
  type VNodeChild = import('vue').VNodeChild
  type CSSProperties = import('vue').CSSProperties

  // below 3 from vue
  type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
  type RecordToUnion<T extends Record<string, any>> = T[keyof T]
  type ShortEmits<T extends Record<string, any>> = UnionToIntersection<RecordToUnion<{
    [K in keyof T]: (evt: K, ...args: T[K]) => void;
  }>>

  // vue-router
  type Router = import('vue-router').Router
  type RouteRecordRaw = import('vue-router').RouteRecordRaw
  type RouteLocationRaw = import('vue-router').RouteLocationRaw
  type RouteLocationNormalized = import('vue-router').RouteLocationNormalized
  type RouteLocationNormalizedLoaded =
    import('vue-router').RouteLocationNormalizedLoaded

  // value of const
  type ValueOfAppConstDevice = import('@/const').ValueOfAppConstDevice
  type ValueOfAppConstTabDeleteType =
    import('@/const').ValueOfAppConstTabDeleteType
  type ValueOfAppConstLocale = import('@/const').ValueOfAppConstLocale
  type ValueOfAppConstMenuType = import('@/const').ValueOfAppConstMenuType
  type ValueOfAppConstMenuTernal = import('@/const').ValueOfAppConstMenuTernal
  type ValueOfAppConstPersistKey = import('@/const').ValueOfAppConstPersistKey
  type ValueOfAppConstStorageType = import('@/const').ValueOfAppConstStorageType
  type ValueOfAppConstSymbolKey = import('@/const').ValueOfAppConstSymbolKey
  type ValueOfAppConstTransitionName =
    import('@/const').ValueOfAppConstTransitionName
  type ValueOfAppConstCollapseMode =
    import('@/const').ValueOfAppConstCollapseMode
  type ValueOfAppConstTabStyleMode =
    import('@/const').ValueOfAppConstTabStyleMode
  type ValueOfAppConstLayoutMode = import('@/const').ValueOfAppConstLayoutMode
  type ValueOfAppConstLockMode = import('@/const').ValueOfAppConstLockMode

  // easy-fns-ts
  type Nullable<T> = import('easy-fns-ts').Nullable<T>
  type StringOrNumber = import('easy-fns-ts').StringOrNumber
  type BaseDataType = import('easy-fns-ts').BaseDataType
  type IndexType = import('easy-fns-ts').IndexType
  type OptionDataItem<T = any> = import('easy-fns-ts').OptionDataItem<T>
  type TreeNodeItem<T = any> = import('easy-fns-ts').TreeNodeItem<T>

  // App Relatives
  type AppSettings = import('./settings').AppSettings

  // echarts option
  type EChartsOption = import('echarts').EChartsOption
}

export {}
