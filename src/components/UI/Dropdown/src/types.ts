import type { DropdownProps } from 'naive-ui'

export interface ICompUIDropdownProps {
  dropdownProps?: DropdownProps
}

export interface ICompUIDropdownInst {
  setProps: (p: ICompUIDropdownProps) => void

  openDropdown: (e: MouseEvent) => void

  closeDropdown: () => void
}
