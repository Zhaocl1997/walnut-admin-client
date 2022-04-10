import WRadio from './src/index.vue'
import { WithValue } from '../../HOC/WithValue'

const HOCRadio = WithValue(WRadio)

export * from './src/types'

export default HOCRadio
