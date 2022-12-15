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

interface WDescItemExtend {
  value: StringOrNumber
  formatter?: (val: string) => string
}

export type WDescriptionsItem = DescriptionItemProps &
Partial<WDescTypeTag | WDescTypeLink | WDescTypeJson | WDescTypeDict> &
WDescItemExtend

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDescriptionProps extends DescriptionsProps, ExtendProps {}
