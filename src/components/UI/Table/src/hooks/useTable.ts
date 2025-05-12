import type { WTable } from '../types'

export function useTable<T>(props: WTable.Hooks.UseTable.Props<T>): WTable.Hooks.UseTable.ReturnType<T> {
  isInSetup()

  const wTableRef = shallowRef<WTable.Inst.WTableInst<T>>()

  const register = (instance: WTable.Inst.WTableInst<T>) => {
    wTableRef.value = instance
  }

  watchEffect(() => {
    props && wTableRef.value?.setProps(unref(props) as WTable.Props<T>)
  })

  const methods: WTable.Hooks.UseTable.Methods<T> = {
    clearFilters: () => wTableRef.value.clearFilters(),
    clearSorter: () => wTableRef.value.clearSorter(),
    onApiList: () => wTableRef.value.onApiList(),
    onApiDelete: id => wTableRef.value.onApiDelete(id),
    onApiDeleteMany: () => wTableRef.value.onApiDeleteMany(),
    onGetApiListParams: () => wTableRef.value?.onGetApiListParams(),
  }

  return [register, methods]
}
