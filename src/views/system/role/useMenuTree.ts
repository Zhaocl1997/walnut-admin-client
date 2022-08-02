import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'
import { menuAPI } from '/@/api/system/menu'

export const useMenuTree = () => {
  const { t } = useAppI18n()

  const menuDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])
  const treeSelectDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])

  // left menu tree data, do not need root node
  const getLeftMenu = computed(() => {
    if (menuDataRef.value.length !== 0) {
      return formatTree<AppSystemMenu>(menuDataRef.value[0]?.children!, {
        format: (node) => ({
          ...node,
          title: node.title ? t(node.title!) : node.title,
        }),
      })
    }
  }) as ComputedRef<TreeNodeItem<AppSystemMenu>[]>

  // tree select data option, the data source has been filtered with `ELEMENT` menu
  const getTreeSelect = computed(() => {
    if (treeSelectDataRef.value.length !== 0) {
      return formatTree<AppSystemMenu>(treeSelectDataRef.value, {
        format: (node) => ({
          ...node,
          title: node.title ? t(node.title!) : node.title,
        }),
      })
    }
  }) as ComputedRef<TreeNodeItem<AppSystemMenu>[]>

  const onInit = async () => {
    const res = await menuAPI.list()

    // build, order and format
    const menuData = orderTree<AppSystemMenu>(
      arrToTree<AppSystemMenu>(
        cloneDeep(res.data),
        { id: '_id' },
        { transformEmptyChildrenToNull: true }
      )
    )

    const treeSelectData = orderTree<AppSystemMenu>(
      arrToTree<AppSystemMenu>(
        cloneDeep(res.data).filter((i) => i.type !== AppConstMenuType.ELEMENT),
        { id: '_id' },
        {
          transformEmptyChildrenToNull: true,
        }
      )
    )

    menuDataRef.value = menuData
    treeSelectDataRef.value = treeSelectData
  }

  onMounted(() => {
    onInit()
  })

  return { getLeftMenu, getTreeSelect, onInit }
}
