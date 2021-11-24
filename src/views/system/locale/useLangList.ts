import { langAPI } from '/@/api/system/lang'

export const useLangList = () => {
  const langList = ref<BaseOptionDataItem[]>([])

  const onGetLangList = async () => {
    const res = await langAPI.list()
    langList.value = res.data.map((i) => ({
      label: i.description,
      value: i._id,
    }))
  }

  onMounted(() => {
    onGetLangList()
  })

  return { langList }
}
