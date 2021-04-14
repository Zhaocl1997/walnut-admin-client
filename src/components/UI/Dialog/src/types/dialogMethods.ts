import type { WDialogProps } from './dialogProps'

export interface WDialogMethods {
  setProps: (props: WDialogProps) => void
  openDialog: (props: WDialogProps) => void
  closeDialog: () => void
}
