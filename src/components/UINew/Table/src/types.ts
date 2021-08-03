import type { ExtractPropTypes } from 'vue'
import type { DataTableProps } from 'naive-ui'
import type { useEventParams } from '/@/hooks/component/useEvent'

import { props } from './props'

export declare namespace WTable {
  interface Props
    extends DataTableProps,
      Partial<ExtractPropTypes<typeof props>> {}

  namespace Params {
    type Entry = useEventParams<'hook', any>
  }
}
