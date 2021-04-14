import type { Ref } from 'vue'

export const useTableMethods = (tableRef: Ref<any>, customMethods: any) => {
  const tableMethods: any = {
    ...customMethods,
  }

  return {
    tableMethods,
  }
}
