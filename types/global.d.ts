// https://jkchao.github.io/typescript-book-chinese/
/// <reference types="vite/client" />
/// <reference types="unplugin-turbo-console/client" />

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type PromiseFn<T = any> = (args?: T) => Promise<void>

declare type Recordable<T = any> = Record<string, T>

declare type ComponentTrigger = 'hover' | 'click' | 'contentmenu'

declare type ActionType = 'create' | 'update' | ''

declare type TargetContext = '_self' | '_blank'

declare type ValueOf<T> = T[keyof T]

declare type MaybeNullOrUndefined<T> = T | null | undefined

declare type NaiveCompType =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

declare interface RowData {
  [key: string]: unknown
}

declare type RecordNullable<T> = {
  [P in keyof T]?: Nullable<T[P]>
}

type IDeepMaybeRef<T> =
  T extends Ref<infer V>
    ? MaybeRefOrGetter<V>
    : T extends (...args: infer Args) => infer R
      ? (...args: { [K in keyof Args]: IDeepMaybeRef<Args[K]> }) => IDeepMaybeRef<R>
      : T extends Array<any> | object
        ? {
            [K in keyof T]: IDeepMaybeRef<T[K]>;
          }
        : MaybeRefOrGetter<T>

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
