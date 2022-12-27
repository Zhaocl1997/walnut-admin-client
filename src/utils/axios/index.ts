import axios from 'axios'

import { Axios } from './src/main'
import { cacheAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from './src/adapters'
import { transform } from './transform'

const { axiosTimeout, axiosCache } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

export const AppAxios = new Axios({
  originalConfig: {
    baseURL: httpUrl,

    // time out, default is 10s
    timeout: Number(axiosTimeout) * 1000,

    adapter: retryAdapterEnhancer(throttleAdapterEnhancer(
      cacheAdapterEnhancer(axios.defaults.adapter!))),
  },
  extendConfig: transform,
})
