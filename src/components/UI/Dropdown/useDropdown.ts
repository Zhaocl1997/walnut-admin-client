import type { ICompUIDropdownInst, ICompUIDropdownProps } from '.'

export function useDropdown(props: ICompUIDropdownProps): [(inst: ICompUIDropdownInst) => void, ICompUIDropdownInst] {
  isInSetup()

  const wDropdownRef = shallowRef<ICompUIDropdownInst>()

  const register = (inst: ICompUIDropdownInst) => {
    wDropdownRef.value = inst

    watchEffect(() => {
      inst.setProps!(props)
    })
  }

  const methods: ICompUIDropdownInst = {
    setProps: props => wDropdownRef.value?.setProps!(props),
    openDropdown: e => wDropdownRef.value?.openDropdown!(e),
    closeDropdown: () => wDropdownRef.value?.closeDropdown!(),
  }

  return [register, methods]
}
