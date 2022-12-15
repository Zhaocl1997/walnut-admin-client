import type { WDropdown } from '../types'

export const useDropdown = <T>(
  props: WDropdown.Props,
): WDropdown.Hook.useDropdown => {
  isInSetup()

  const wDropdownRef = ref<Nullable<WDropdown.Inst.WDropdownInst>>(null)

  const register = (instance: WDropdown.Inst.WDropdownInst) => {
    wDropdownRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: WDropdown.Inst.WDropdownInst = {
    setProps: props => wDropdownRef.value?.setProps(props),
    openDropdown: e => wDropdownRef.value?.openDropdown(e),
    closeDropdown: () => wDropdownRef.value?.closeDropdown(),
  }

  return [register, methods]
}
