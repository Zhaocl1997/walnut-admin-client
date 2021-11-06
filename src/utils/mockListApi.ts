interface listQueryParams {
  pageNum: number
  pageSize: number
}

export const mockListApi =
  <T>(arr: T[]) =>
  (query: listQueryParams = { pageNum: 1, pageSize: 10 }) => {
    const num = query.pageNum || 1
    const size = query.pageSize || 10
    const total = arr.length

    return {
      data: arr.slice((num - 1) * size, (num - 1) * size + size),
      total,
    }
  }
