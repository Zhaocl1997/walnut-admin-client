declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type Recordable<T extends any = any> = Record<string, T>

declare type ReadonlyRecordable<T extends any = any> = {
  readonly [key: string]: T
}

declare type Nullable<T> = T | null

/**
 * Maybe it's a ref, or not.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
 * ```
 */
declare type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

// Some types relative to ElementPlus
declare type ComponentSize = 'medium' | 'small' | 'mini'

declare type ComponentType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

declare type ComponentPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

declare type ComponentTrigger = 'hover' | 'click' | 'contentmenu'
