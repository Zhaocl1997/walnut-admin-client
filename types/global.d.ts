// https://jkchao.github.io/typescript-book-chinese/
/// <reference types="vite/client" />
/// <reference types="unplugin-turbo-console/client" />

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type PromiseFn<T = any> = (args?: T) => Promise<void>

declare type Recordable<T = any> = Record<string, T>

declare type IActionType = 'create' | 'update'

declare type ITargetContext = '_self' | '_blank'

declare type ValueOf<T> = T[keyof T]

// thanks to deepseek R1
type IDeepMaybeRef<T> =
  // 处理函数类型（禁用分发）
  [T] extends [(...args: infer Args) => infer R] ? (
    (...args: { [K in keyof Args]: IDeepMaybeRef<Args[K]> }) => IDeepMaybeRef<R>
  ) :
  // 优先处理精确基础类型（关键修改：使用 T extends 而非 extends T）
    T extends boolean ? MaybeRefOrGetter<boolean> :
      T extends number ? MaybeRefOrGetter<number> :
        T extends string ? MaybeRefOrGetter<string> :
        // 处理 Ref 类型
          T extends Ref<infer V> ? MaybeRefOrGetter<V> :
          // 处理数组类型（禁用分发）
              [T] extends [Array<infer U>] ? Array<IDeepMaybeRef<U>> :
              // 处理对象类型（禁用分发）
                  [T] extends [object] ? { [K in keyof T]: IDeepMaybeRef<T[K]> } :
                  // 处理联合类型（保持联合结构）
                      [T] extends [unknown] ? MaybeRefOrGetter<T> :
                        never

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
