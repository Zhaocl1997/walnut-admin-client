import { isProd } from '../utils/constant/vue'
import { AppAxios } from '../utils/axios'

export class BaseAPI {
  private readonly model: string
  private readonly section: string

  constructor({ model, section }: { model: string; section: string }) {
    this.model = model
    this.section = section
  }

  getModule() {
    return `/${this.model}/${this.section}`
  }

  list(data: any) {
    return AppAxios.post({
      url: `${this.getModule()}/list`,
      data,
    })
  }

  create(data: any) {
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

  read(id: string | number) {
    return AppAxios.get({
      url: `${this.getModule()}/${id}`,
    })
  }

  update(data: any) {
    return AppAxios.put(
      {
        url: `${this.getModule()}`,
        data,
      },
      {
        demonstrate: isProd(),
      }
    )
  }

  delete(id: string | number) {
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
