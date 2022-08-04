/**
 * @description mock list endpoint
 */
export const mockListApi =
  <T>(arr: T[]) =>
  (params: BaseListParams) => {
    const num = params.page?.page || 1
    const size = params.page?.pageSize || 10
    const total = arr.length

    return {
      data: arr.slice((num - 1) * size, (num - 1) * size + size),
      total,
    }
  }
