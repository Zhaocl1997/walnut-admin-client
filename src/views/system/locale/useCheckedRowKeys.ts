export const useCheckedRowKeys = () => {
  const checkedRowKeysRef = ref<StringOrNumber[]>([])

  const onUpdateCheckedRowKeys = (rowKeys: StringOrNumber[]) => {
    checkedRowKeysRef.value = rowKeys
  }

  return { checkedRowKeysRef, onUpdateCheckedRowKeys }
}
