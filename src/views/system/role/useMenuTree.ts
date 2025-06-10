import { getMenuTreeAPI } from '@/api/system/menu'
import { formatTree } from 'easy-fns-ts'

export function useMenuTree() {
  const { t } = useAppI18n()

  const menuDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])
  const treeSelectDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])
  const menuActiveNamesOptions = ref<Pick<AppSystemMenu, 'title' | 'name'>[]>([])

  const getLeftMenu = computed((): TreeNodeItem<AppSystemMenu>[] => {
    return formatTree<AppSystemMenu>(menuDataRef.value, node => ({
      ...node,
      title: node.title ? t(node.title) : node.title,
    }))
  })

  const getTreeSelect = computed((): TreeNodeItem<AppSystemMenu>[] => {
    return formatTree<AppSystemMenu>(treeSelectDataRef.value, node => ({
      ...node,
      title: node.title ? t(node.title) : node.title,
    }))
  })

  const onInit = async () => {
    const res = await getMenuTreeAPI()

    menuDataRef.value = res.fullTree
    treeSelectDataRef.value = res.treeWithoutTypeElement
    menuActiveNamesOptions.value = res.menuActiveNamesOptions
  }

  onMounted(onInit)

  return { getLeftMenu, getTreeSelect, menuActiveNamesOptions, onInit }
}
