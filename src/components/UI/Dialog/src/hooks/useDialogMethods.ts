import type { WDialogMethods, WDialogProps } from '../types'

export const useDialogMethods = (methods: any): WDialogMethods => {
  const { setProps, onToggleVisible } = methods

  const openDialog = (props: WDialogProps) => {
    setProps(props)
    onToggleVisible(true)
  }

  const closeDialog = () => {
    onToggleVisible(false)
  }

  return {
    setProps,
    openDialog,
    closeDialog,
  }
}
