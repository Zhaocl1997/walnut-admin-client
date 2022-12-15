import { WithValue } from '../../HOC/WithValue'
import WSelect from './src/index.vue'

const HOCSelect = WithValue(WSelect)

export * from './src/types'

export default HOCSelect
