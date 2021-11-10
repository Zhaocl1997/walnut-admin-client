declare global {
  interface MyVNode extends import('vue').VNode {
    type: {
      parentView?: boolean
    }
  }

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
  type ValueOfDevideConst = import('/@/const').ValueOfDevideConst
  type ValueOfDeleteTabConst = import('/@/const').ValueOfDeleteTabConst
  type ValueOfDarkModeConst = import('/@/const').ValueOfDarkModeConst
  type ValueOfLocaleConst = import('/@/const').ValueOfLocaleConst
  type ValueOfMenuTypeConst = import('/@/const').ValueOfMenuTypeConst
  type ValueOfMenuTernalConst = import('/@/const').ValueOfMenuTernalConst
  type ValueOfPersistentKeysConst =
    import('/@/const').ValueOfPersistentKeysConst
  type ValueOfStorageTypeConst = import('/@/const').ValueOfStorageTypeConst
  type ValueOfSymbolKeyConst = import('/@/const').ValueOfSymbolKeyConst
  type ValueOfTransitionNameConst =
    import('/@/const').ValueOfTransitionNameConst
  type ValueOfMenuCollapseModeConst =
    import('/@/const').ValueOfMenuCollapseModeConst
  type ValueOfTabStyleModeConst = import('/@/const').ValueOfTabStyleModeConst

  // vite
  type VitePlugin = import('vite').Plugin

  // Utils
  type MaybeRef<T> = import('@vueuse/core').MaybeRef<T>
  type DeepMaybeRef<T> = import('@vueuse/core').DeepMaybeRef<T>
}

export {}
