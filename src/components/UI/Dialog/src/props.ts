import { ElDialog } from 'element-plus'

const extendProps = {}

export const extendPropKeys = Object.keys(extendProps).concat('isTrusted')

export default {
  ...ElDialog.props,

  /**
   * @override
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * @override
   */
  top: {
    type: String,
    default: '6vh',
  },

  ...extendProps,
}
