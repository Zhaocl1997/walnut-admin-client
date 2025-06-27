import type { Recordable } from 'easy-fns-ts'
import type { UnwrapRef } from 'vue'

declare global {
  // below 3 from vue
  type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
  type RecordToUnion<T extends Record<string, any>> = T[keyof T]
  type ShortEmits<T extends Record<string, any>> = UnionToIntersection<RecordToUnion<{
    [K in keyof T]: (evt: K, ...args: T[K]) => void;
  }>>

  // App Relatives
  type AppSettings = import('./settings').AppSettings

  // echarts option
  type EChartsOption = import('echarts').EChartsOption

  interface ICapInst {
    new ({ apiEndpoint: string }, el?: HTMLElement): { solve: () => Promise<{ token: string }> }
  }

type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? UnwrapRef<T[K]> extends object
          ? `${K}` | `${K}.${DeepKeyOf<UnwrapRef<T[K]>> & string}`
          : `${K}`
        : never;
    }[keyof T]
  : never

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

}

export {}
