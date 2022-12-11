export const useTabsSortable = (isSortable: MaybeRefSelf<boolean>) => {
  const appTab = useAppStoreTab()

  return useSortable(isSortable, {
    draggable: '.tab-draggable',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt

      appTab.changeTabOrder(oldIndex!, newIndex!)
    },
  })
}
