import { ElDialog } from 'element-plus'

export default {
  /**
   * @description original ElDialog props
   */
  ...ElDialog.props,

  /**
   * @override
   * @type {Boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * @override
   * @type {String}
   * @default 6vh
   */
  top: {
    type: String,
    default: '6vh',
  },
}
