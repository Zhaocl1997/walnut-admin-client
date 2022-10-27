import * as echarts from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent,
  ToolboxComponent,
  CanvasRenderer,
])

export default echarts
