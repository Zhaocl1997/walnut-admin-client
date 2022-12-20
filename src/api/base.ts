export type BaseAPIType<T> = BaseAPI<T>

const { demo } = useAppEnv('build')

export class BaseAPI<T> {
  private readonly baseAPI: string

  constructor({ model, section }: { model: string; section: string }) {
    this.baseAPI = `/${model}/${section}`
  }

  list(data?: BaseListParams<T>) {
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
        demonstrate: demo,
      },
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
        demonstrate: demo,
      },
    )
  }

  delete(id: StringOrNumber) {
    return AppAxios.delete(
      {
        url: `${this.baseAPI}/${id}`,
      },
      {
        demonstrate: demo,
      },
    )
  }

  deleteMany(id: string) {
    return AppAxios.delete(
      {
        url: `${this.baseAPI}/deleteMany/${id}`,
      },
      {
        demonstrate: demo,
      },
    )
  }

  clear() {
    return AppAxios.delete(
      {
        url: `${this.baseAPI}/clear`,
      },
      {
        demonstrate: demo,
      },
    )
  }
}
