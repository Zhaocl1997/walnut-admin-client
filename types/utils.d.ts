import type { Ref, ComputedRef } from 'vue'

/**
 * @description Maybe it's a ref, or not.
 */
declare type MaybeRef<T> = T | Ref<T>

/**
 * @description Maybe deep version
 */
declare type MaybeRefDeep<T> = T extends Ref<infer V>
  ? MaybeRef<V>
  : T extends Fn // avoid function
  ? T
  : T extends Array<any> | object
  ? {
      [K in keyof T]: MaybeRefDeep<T[K]>
    }
  : MaybeRef<T>

/**
 * @description Maybe it's an object
 */
declare type MaybeRefRecord<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}
