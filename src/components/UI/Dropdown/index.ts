import type { DropdownProps } from 'naive-ui'

export { default } from './index.vue'

export * from './useDropdown'

export interface ICompUIDropdownProps {
  dropdownProps?: DropdownProps
}

export interface ICompUIDropdownInst {
  setProps: (p: IDeepMaybeRef<ICompUIDropdownProps> | ICompUIDropdownProps) => void

  openDropdown: (e: MouseEvent) => void

  closeDropdown: () => void
}
