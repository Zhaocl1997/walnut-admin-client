// get area children by pcode, default will return province info
export function getAreaChildrenByPcode(pcode?: string) {
  return AppAxios.get<AppSharedArea[]>(
    {
      url: '/shared/area/getChildrenByPcodeWithCache',
      params: {
        pcode,
      },
      _cache: true,
    },
  )
}

// area feedback, single
export function getAreaFeedbackByCode(code?: string) {
  return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
    url: '/shared/area/feedback',
    params: {
      code,
    },
  })
}

// area feedback, multiple
export function getAreaFeedbackByCodes(codes?: string) {
  return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
    url: '/shared/area/feedback/multiple',
    params: {
      codes,
    },
  })
}
