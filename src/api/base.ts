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
    return AppAxios.request({
      method: 'POST',
      url: `${this.getModule()}/list`,
      data,
    })
  }

  create(data: any) {
    return AppAxios.request({
      method: 'POST',
      url: `${this.getModule()}`,
      data,
      customOptions: {
        demonstrate: isProd(),
      },
    })
  }

  read(id: string | number) {
    return AppAxios.request({
      method: 'GET',
      url: `${this.getModule()}/${id}`,
    })
  }

  update(data: any) {
    return AppAxios.request({
      method: 'PUT',
      url: `${this.getModule()}`,
      data,
      customOptions: {
        demonstrate: isProd(),
      },
    })
  }

  delete(id: string | number) {
    return AppAxios.request({
      method: 'DELETE',
      url: `${this.getModule()}/${id}`,
      customOptions: {
        demonstrate: isProd(),
      },
    })
  }
}
