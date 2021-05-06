import { ElTable } from 'element-plus'

export default {
  /**
   * @description original ElTable props
   */
  ...ElTable.props,

  /**
   * =======================================
   * =======================================
   * =========== v-model Relative ==========
   * =======================================
   * =======================================
   */

  /**
   * @description v-model value ,for single or multiple
   * @type {Array, Object}
   */
  modelValue: [Array, Object],

  /**
   * @description v-model:headers value, for table header columns
   * @type {Array}
   */
  headers: Array,

  /**
   * @description able to use v-model for single choose
   * @type {Boolean}
   * @default false
   */
  single: {
    type: Boolean,
    default: false,
  },

  /**
   * @description able to use v-model for multiple selections
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * =======================================
   * =======================================
   * ========= Pagination Relative =========
   * =======================================
   * =======================================
   */

  /**
   * @description total for pagination use
   * @type {Number}
   */
  total: Number,

  /**
   * @description v-model:pageNum value, for pagination currentPage
   * @type {Number}
   * @default 1
   */
  pageNum: {
    type: Number,
    default: 1,
  },

  /**
   * @description v-model:pageSize value, for pagination pageSize
   * @type {Number}
   * @default 10
   */
  pageSize: {
    type: Number,
    default: 10,
  },

  /**
   * =======================================
   * =======================================
   * ============ Title / Help =============
   * =======================================
   * =======================================
   */

  /**
   * @description title content
   * @type {String}
   */
  tableTitle: String,

  /**
   * @description help message content
   * @type {String}
   */
  tableHelp: String,

  /**
   * =======================================
   * =======================================
   * ============ State / Empty ============
   * =======================================
   * =======================================
   */

  /**
   * @description description when no data
   * @type {String}
   */
  description: String,

  /**
   * @description image uri to display
   * @type {String}
   */
  image: String,

  /**
   * @description image size
   * @type {Number}
   */
  imageSize: Number,

  /**
   * =======================================
   * =======================================
   * ========== State / Loading ============
   * =======================================
   * =======================================
   */

  /**
   * @description loading state
   * @type {Boolean}
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * @description loading type, only support for ['default', 'skeleton'] two types
   * @type {String}
   * @default loading
   */
  loadingType: { type: String, default: 'default' },

  /**
   * =======================================
   * =======================================
   * ============ Api Relative =============
   * =======================================
   * =======================================
   */

  /**
   * @description api list function
   * @type {Function}
   */
  apiFn: Function,

  /**
   * =======================================
   * =======================================
   * =========== Common Settings ===========
   * =======================================
   * =======================================
   */

  /**
   * @description table settings
   * @type {Boolean}
   * @default false
   */
  hasSettings: {
    type: Boolean,
    default: false,
  },

  /**
   * @description pagination
   * @type {Boolean}
   * @default false
   */
  hasPage: {
    type: Boolean,
    default: false,
  },
}
