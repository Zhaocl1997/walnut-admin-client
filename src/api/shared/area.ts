// get area children by pcode, default will return province info
export const getAreaChildrenByPcode = (pcode?: string) => {
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
export const getAreaFeedbackByCode = (code?: string) => {
  return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
    url: '/shared/area/feedback',
    params: {
      code,
    },
  })
}

// area feedback, multiple
export const getAreaFeedbackByCodes = (codes?: string) => {
  return AppAxios.get<TreeNodeItem<AppSharedArea>[]>({
    url: '/shared/area/feedback/multiple',
    params: {
      codes,
    },
  })
}
