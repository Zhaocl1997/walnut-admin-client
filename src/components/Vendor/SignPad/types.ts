import type { Options } from 'signature_pad'

export interface IWCompVendorSignPadProps {
  options?: Options
  height?: string
  width?: string
  disabled?: boolean
  defaultUrl?: string
  content?: string
}

export interface WSignPadInst {
  save: (format?: string) => string
  clear: () => void
  isEmpty: () => boolean
  undo: () => void
  fromDataURL: (url: string) => void
  getImage: (type?: string) => Promise<string>
}
