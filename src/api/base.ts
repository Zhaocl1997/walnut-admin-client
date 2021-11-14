import type { BaseListResponse } from '/@/utils/axios'

import { isProd } from '/@/utils/constant/vue'

interface ListBaseParams {
  page?: number
  pageSize?: number
}

export class BaseAPI<T> {
  private readonly baseAPI: string

  constructor({ model, section }: { model: string; section: string }) {
    this.baseAPI = `/${model}/${section}`
  }

  list<E>(data?: ListBaseParams & E) {
    return AppAxios.post<BaseListResponse<T>>({
      url: `${this.baseAPI}/list`,
      data,
    })
  }

  create(data: T) {
    return AppAxios.post(
      {
        url: `${this.baseAPI}`,
        data,
      },
      {
        demonstrate: isProd(),
      }
    )
  }

  read(id: StringOrNumber) {
    return AppAxios.get<T>({
      url: `${this.baseAPI}/${id}`,
    })
  }

  update(data: T) {
    return AppAxios.put<T>(
      {
        url: `${this.baseAPI}`,
        data,
      },
      {
        demonstrate: isProd(),
      }
    )
  }

  delete(id: StringOrNumber) {
    return AppAxios.delete(
      {
        url: `${this.baseAPI}/${id}`,
      },
      {
        demonstrate: isProd(),
      }
    )
  }
}
