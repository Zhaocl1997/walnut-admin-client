import type { Ref, ComputedRef } from 'vue'

/**
 * @description Maybe it's a ref, or not.
 */
declare type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

/**
 * @description Maybe it's an object
 */
declare type MaybeRefRecord<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}
