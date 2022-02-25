// https://jkchao.github.io/typescript-book-chinese/

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type PromiseFn<T = any> = (args?: T) => Promise<void>

declare type Recordable<T = any> = Record<string, T>

declare type ComponentTrigger = 'hover' | 'click' | 'contentmenu'

declare type ActionType = 'create' | 'update' | ''

declare type RowData = {
  [key: string]: unknown
}

declare type MaybeRefSelf<T> = T | Ref<T> | ComputedRef<T>

// TODO type need to optimise liter string not working
declare type DeepMaybeRefSelf<T> = T extends Ref<infer V>
  ? MaybeRefSelf<V>
  : T extends Fn // avoid function
  ? T
  : T extends boolean // boolean
  ? MaybeRefSelf<boolean>
  : T extends string // string
  ? MaybeRefSelf<string>
  : T extends Array<any> | object
  ? {
      [K in keyof T]: DeepMaybeRefSelf<T[K]>
    }
  : MaybeRefSelf<T>
