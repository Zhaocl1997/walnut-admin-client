import { Axios } from './src/main'
import { transform } from './transform'
import { originalConfig } from './config'

// app axios instance
export const AppAxios = new Axios({
  originalConfig,

  extendConfig: transform,
})
