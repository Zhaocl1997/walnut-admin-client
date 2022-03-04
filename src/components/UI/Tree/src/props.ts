import type { TreeProps } from 'naive-ui'

export const props = {
  /**
   * @description NTree original props
   */
  treeProps: Object as PropType<TreeProps>,

  search: Boolean as PropType<boolean>,

  toolbar: Boolean as PropType<boolean>,

  nodeToolbar: Boolean as PropType<boolean>,
}
