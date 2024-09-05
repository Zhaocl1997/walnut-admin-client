// get area children by pcode, default will return province info
export function getAreaChildrenByPcode(pcode?: string) {
  return AppAxios.get<AppSharedArea[]>(
    {
      url: '/shared/area/children',
      params: {
        pcode,
      },
      _cache: true,
    },
  )
}

// area feedback, single
export function getAreaFeedbackByCode(codes?: string | string[]) {
  return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
    url: '/shared/area/feedback',
    params: {
      codes,
    },
  })
}

// // area feedback, multiple
// export function getAreaFeedbackByCodes(codes?: string) {
//   return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
//     url: '/shared/area/feedback/multiple',
//     params: {
//       codes,
//     },
//   })
// }
