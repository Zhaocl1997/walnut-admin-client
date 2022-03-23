import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'
import { menuAPI } from '/@/api/system/menu'

export const useMenuTree = () => {
  const { t } = useAppI18n()

  const rootId = ref<string>()
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
    const menuData = formatTree<AppSystemMenu>(
      orderTree<AppSystemMenu>(
        arrToTree<AppSystemMenu>(cloneDeep(res.data), { id: '_id' })
      ),
      {
        format: (node) =>
          node.children!.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    const treeSelectData = formatTree<AppSystemMenu>(
      orderTree<AppSystemMenu>(
        arrToTree<AppSystemMenu>(
          cloneDeep(res.data).filter((i) => i.type !== MenuTypeConst.ELEMENT),
          { id: '_id' }
        )
      ),
      {
        format: (node) =>
          node.children!.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    rootId.value = menuData[0]._id
    menuDataRef.value = menuData
    treeSelectDataRef.value = treeSelectData
  }

  onMounted(() => {
    onInit()
  })

  return { rootId, getLeftMenu, getTreeSelect, onInit }
}
