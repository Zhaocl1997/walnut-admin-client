import { originalConfig } from './config'
import { Axios } from './src/main'
import { transform } from './transform'

// app axios instance
export const AppAxios = new Axios({
  originalConfig,

  extendConfig: transform,
})
