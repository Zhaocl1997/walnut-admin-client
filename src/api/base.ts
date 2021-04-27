import type { BaseListResponse } from '/@/utils/axios'
import type { MaybeRef } from '/~/utils'

import { isProd } from '/@/utils/constant/vue'
import { AppAxios } from '/@/utils/axios'

export class BaseAPI<T> {
  private readonly model: string
  private readonly section: string

  constructor({ model, section }: { model: string; section: string }) {
    this.model = model
    this.section = section
  }

  private getModule() {
    return `/${this.model}/${this.section}`
  }

  list(data?: any) {
    return AppAxios.post<BaseListResponse<T>>({
      url: `${this.getModule()}/list`,
      data,
    })
  }

  create(data: MaybeRef<T>) {
    return AppAxios.post(
      {
        url: `${this.getModule()}`,
        data,
      },
      {
        demonstrate: isProd(),
      }
    )
  }

  read(id: MaybeRef<string | number>) {
    return AppAxios.get<T>({
      url: `${this.getModule()}/${id}`,
    })
  }

  update(data: MaybeRef<T>) {
    return AppAxios.put<T>(
      {
        url: `${this.getModule()}`,
        data,
      },
      {
        demonstrate: isProd(),
      }
    )
  }

  delete(id: MaybeRef<string | number>) {
    return AppAxios.delete(
      {
        url: `${this.getModule()}/${id}`,
      },
      {
        demonstrate: isProd(),
      }
    )
  }
}
