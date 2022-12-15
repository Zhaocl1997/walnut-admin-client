import { langAPI } from '@/api/system/lang'

export const useLangList = () => {
  const langList = ref<OptionDataItem[]>([])

  const onGetLangList = async () => {
    const res = await langAPI.list()
    langList.value = res.data.map(i => ({
      label: i.description!,
      value: i._id!,
    }))
  }

  onMounted(async () => {
    await onGetLangList()
  })

  return { langList }
}
