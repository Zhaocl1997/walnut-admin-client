import type { Ref, ComputedRef } from 'vue'

/**
 * Maybe it's a ref, or not.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
 * ```
 */
declare type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
