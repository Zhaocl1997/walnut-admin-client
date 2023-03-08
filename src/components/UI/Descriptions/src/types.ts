import type {
  DescriptionItemProps,
  DescriptionsProps,
  TagProps,
  TextProps,
} from 'naive-ui'

import type { props } from './props'

interface WDescTypeTag {
  type: 'tag'
  typeProps: TagProps
}

interface WDescTypeLink {
  type: 'link'
  typeProps: TextProps & {
    link: string
  }
}

interface WDescTypeJson {
  type: 'json'
}

interface WDescTypeDict {
  type: 'dict'
  dictType: string
}

interface WDescItemExtend<T> {
  key?: string
  show?: boolean
  value: StringOrNumber
  formatter?: (val: string, record?: T) => string
}

export type WDescriptionsItem<D = any> = DescriptionItemProps &
Partial<WDescTypeTag | WDescTypeLink | WDescTypeJson | WDescTypeDict> &
WDescItemExtend<D>

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDescriptionProps extends DescriptionsProps, ExtendProps {}
