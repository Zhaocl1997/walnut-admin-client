export const useTabsSortable = (isSortable: MaybeRefSelf<boolean>) => {
  const appTab = useAppStoreTab()

  return useSortable(
    {
      draggable: '.tab-draggable',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt

        appTab.changeTabOrder(oldIndex!, newIndex!)
      },
    },
    isSortable
  )
}
