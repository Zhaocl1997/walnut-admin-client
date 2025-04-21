import { menuAPI } from '@/api/system/menu'
import { arrToTree, formatTree, orderTree } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'

export function useMenuTree() {
  const { t } = useAppI18n()

  const menuDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])
  const treeSelectDataRef = ref<TreeNodeItem<AppSystemMenu>[]>([])
  const menuActiveNamesOptions = ref<{ name: string, title: string }[]>([])

  // left menu tree data, do not need root node
  const getLeftMenu = computed(() => {
    if (menuDataRef.value.length !== 0 && menuDataRef.value[0]) {
      return formatTree<AppSystemMenu>(menuDataRef.value[0].children!, {
        format: node => ({
          ...node,
          title: node.title ? t(node.title) : node.title,
        }),
      })
    }
  }) as ComputedRef<TreeNodeItem<AppSystemMenu>[]>

  // tree select data option, the data source has been filtered with `ELEMENT` menu
  const getTreeSelect = computed(() => {
    if (treeSelectDataRef.value.length !== 0) {
      return formatTree<AppSystemMenu>(treeSelectDataRef.value, {
        format: node => ({
          ...node,
          title: node.title ? t(node.title) : node.title,
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
        { transformEmptyChildrenToNull: true },
      ),
    )

    const treeSelectData = orderTree<AppSystemMenu>(
      arrToTree<AppSystemMenu>(
        cloneDeep(res.data).filter(i => i.type !== AppConstMenuType.ELEMENT),
        { id: '_id' },
        {
          transformEmptyChildrenToNull: true,
        },
      ),
    )

    menuDataRef.value = menuData
    treeSelectDataRef.value = treeSelectData
    menuActiveNamesOptions.value = res.data
      .filter(i => i.type === AppConstMenuType.MENU)
      .map(i => ({
        name: i.name!,
        title: i.title!,
      }))
  }

  onMounted(async () => {
    await onInit()
  })

  return { getLeftMenu, getTreeSelect, menuActiveNamesOptions, onInit }
}
