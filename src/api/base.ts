import { omit } from 'lodash-es'

export type BaseAPIType<T extends AppBaseModel> = InstanceType<typeof BaseAPI<T>>

const { demo } = useAppEnv('build')

function omitUnnecessaryFields<T extends AppBaseModel>(data: T) {
  return omit(data, ['_id', 'createdAt', 'updatedAt'])
}

export class BaseAPI<T extends AppBaseModel> {
  private readonly baseAPI: string

  constructor({ model, section }: { model: string, section: string }) {
    this.baseAPI = `/${model}/${section}`
  }

  list(data?: WalnutBaseListParams<T>) {
    return AppAxios.post<WalnutBaseListResponse<T>>({
      url: `${this.baseAPI}/list`,
      data,
    })
  }

  create(data: T) {
    return AppAxios.post(
      {
        url: `${this.baseAPI}`,
        data: omitUnnecessaryFields<T>(data),
        _demonstrate: demo,
      },
    )
  }

  read(id: StringOrNumber) {
    return AppAxios.get<T>({
      url: `${this.baseAPI}/${id}`,
    })
  }

  // fix src/components/Advanced/CRUD/index.vue onYes
  detail() {}

  update(data: T) {
    return AppAxios.put<T>(
      {
        url: `${this.baseAPI}/${data._id}`,
        data: omitUnnecessaryFields<T>(data),
        _demonstrate: demo,
      },
    )
  }

  delete(id: StringOrNumber) {
    return AppAxios.delete<T>(
      {
        url: `${this.baseAPI}/${id}`,
        _demonstrate: demo,
      },
    )
  }

  deleteMany(id: string) {
    return AppAxios.delete<T[]>(
      {
        url: `${this.baseAPI}/deleteMany/${id}`,
        _demonstrate: demo,
      },
    )
  }

  clear() {
    return AppAxios.delete<T>(
      {
        url: `${this.baseAPI}/clear`,
        _demonstrate: demo,
      },
    )
  }
}
