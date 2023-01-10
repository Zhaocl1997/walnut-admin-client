// https://jkchao.github.io/typescript-book-chinese/

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type PromiseFn<T = any> = (args?: T) => Promise<void>

declare type Recordable<T = any> = Record<string, T>

declare type ComponentTrigger = 'hover' | 'click' | 'contentmenu'

declare type ActionType = 'create' | 'update' | ''

declare type TargetContext = '_self' | '_blank'

declare type ValueOf<T> = T[keyof T]

declare type NaiveCompType =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

declare type RowData = {
  [key: string]: unknown
}

declare type RecordNullable<T> = {
  [P in keyof T]?: Nullable<T[P]>
}

declare type MaybeRefSelf<T> = T | Ref<T> | ComputedRef<T>

// TODO type
// extend string => form type not intelligence
// not extend string => other string not working
declare type DeepMaybeRefSelf<T> = T extends Ref<infer V>
  ? MaybeRefSelf<V>
  : T extends Fn // avoid function
  ? T
  : T extends string // string
  ? MaybeRefSelf<string>
  : T extends boolean // boolean
  ? MaybeRefSelf<boolean>
  : T extends Array<any> | object
  ? {
      [K in keyof T]: DeepMaybeRefSelf<T[K]>
    }
  : MaybeRefSelf<T>

const __APP_INFO__: {
  name: string
  version: string
  deps: Recordable<string>
  devDeps: Recordable<string>
  urls: {
    doc: string
    demo: string
    github: string
    author: string
  }
  lastBuildTime: string
}
