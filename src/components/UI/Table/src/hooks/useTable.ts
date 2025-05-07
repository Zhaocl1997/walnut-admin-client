import type { WTable } from '../types'
import type { ICompUITableHooksMethods } from './useTableMethods'

export function useTable<T>(props: IDeepMaybeRef<WTable.Props<T>> | WTable.Props<T>): WTable.Hook.useTableReturnType<T> {
  isInSetup()

  const wTableRef = ref<WTable.Inst.WTableInst<T>>()

  const register = (instance: WTable.Inst.WTableInst<T>) => {
    wTableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props as WTable.Props<T>)
    })
  }

  const methods: ICompUITableHooksMethods<T> & Pick<WTable.Inst.WTableInst<T>, 'onApiList' | 'onApiDelete' | 'onApiDeleteMany' | 'onGetApiListParams'> = {
    clearFilters: () => wTableRef.value.clearFilters(),
    clearSorter: () => wTableRef.value.clearSorter(),
    onApiList: () => wTableRef.value.onApiList(),
    onApiDelete: id => wTableRef.value.onApiDelete(id),
    onApiDeleteMany: ids => wTableRef.value.onApiDeleteMany(ids),
    onGetApiListParams: () => wTableRef.value?.onGetApiListParams(),
  }

  return [register, methods]
}
