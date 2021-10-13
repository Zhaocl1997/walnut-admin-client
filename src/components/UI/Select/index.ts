import WSelect from './src/index.vue'
import { WithValue } from '../../HOC/WithValue'

const HOCSelect = WithValue(WSelect)

export * from './src/types'

export default HOCSelect
