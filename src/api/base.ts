import type { BaseListResponse } from '/@/utils/axios'
import type { MaybeRef } from '/~/utils'

import { isProd } from '/@/utils/constant/vue'

export class BaseAPI<T> {
  private readonly baseAPI: string

  constructor({ model, section }: { model: string; section: string }) {
    this.baseAPI = `/${model}/${section}`
  }

  list(data?: any) {
    return AppAxios.post<BaseListResponse<T>>({
      url: `${this.baseAPI}/list`,
      data,
    })
  }

  create(data: MaybeRef<T>) {
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

  read(id: MaybeRef<StringOrNumber>) {
    return AppAxios.get<T>({
      url: `${this.baseAPI}/${id}`,
    })
  }

  update(data: MaybeRef<T>) {
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

  delete(id: MaybeRef<StringOrNumber>) {
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
