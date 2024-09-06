import type { AxiosAdapter, AxiosResponse } from 'axios'

export function retryAdapterEnhancer(adapter: AxiosAdapter): AxiosAdapter {
  return async (config) => {
    const { _retryTimes } = config

    if (_retryTimes) {
      let timeUp = false
      let count = 0

      const request = async (): Promise<AxiosResponse> => {
        try {
          const response = await adapter(config)

          if (JSON.parse(response.data).code !== BussinessCodeConst.SUCCESS) {
            timeUp = _retryTimes === count
            if (timeUp)
              return response

            count++
            return request()
          }

          return response
        }
        catch (e) {
          timeUp = _retryTimes === count
          if (timeUp)
            throw e

          count++
          return request()
        }
      }
      return request()
    }

    return await adapter(config)
  }
}
