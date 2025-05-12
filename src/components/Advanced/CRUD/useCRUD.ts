import type { WCrud } from './types'

export function useCRUD<T>(props: WCrud.Hooks.UseCRUD.Props<T>): WCrud.Hooks.UseCRUD.ReturnType<T> {
  isInSetup()

  const wCrudRef = ref<WCrud.Inst.WCrudInst<T>>()

  const register = (instance: WCrud.Inst.WCrudInst<T>) => {
    wCrudRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props as WCrud.Props<T>)
    })
  }

  const methods: WCrud.Hooks.UseCRUD.Methods<T> = {
    onOpenCreateForm: () => wCrudRef.value?.onOpenCreateForm(),
    onReadAndOpenUpdateForm: async (id: StringOrNumber) =>
      await wCrudRef.value?.onReadAndOpenUpdateForm(id),
    onDeleteConfirm: async (id: StringOrNumber) =>
      await wCrudRef.value?.onDeleteConfirm(id),
    onDeleteManyConfirm: async () =>
      await wCrudRef.value?.onDeleteManyConfirm(),
    onGetFormData: () => wCrudRef.value?.onGetFormData(),
    // onGetActionType: () => wCrudRef.value?.onGetActionType()!,
    // onGetApiTableListParams: () => wCrudRef.value?.onGetApiTableListParams()!,
    // onApiTableCloseForm: () => wCrudRef.value?.onApiTableCloseForm()!,
    // onApiTableList: async () => await wCrudRef.value?.onApiTableList(),
  }

  return [register, methods]
}
