import type { Recordable } from 'easy-fns-ts'

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
