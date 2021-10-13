import type { PropType } from 'vue'
import type { ModalProps, DrawerProps, DrawerContentProps } from 'naive-ui'
import type { WForm } from './types'

export const props = {
  schemas: {
    type: Array as PropType<WForm.Schema.Item[]>,
    default: () => [],
  },

  cols: {
    type: Number as PropType<number>,
    default: 24,
  },

  span: {
    type: Number as PropType<number>,
    default: 24,
  },

  xGap: {
    type: Number as PropType<number>,
    default: 0,
  },

  yGap: {
    type: Number as PropType<number>,
    default: 0,
  },

  preset: {
    type: String as PropType<WForm.preset>,
    default: undefined,
  },

  advancedProps: {
    type: Object as PropType<ModalProps | (DrawerProps & DrawerContentProps)>,
    default: undefined,
  },
}
