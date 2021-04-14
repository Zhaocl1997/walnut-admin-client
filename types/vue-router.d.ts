// Ensure this file is parsed as a module regardless of dependencies.
export {}

// Define RouteMeta interface
declare module 'vue-router' {
  interface RouteMeta {
    cache?: boolean

    title?: string

    icon?: string

    affix?: boolean

    url?: string
  }
}
