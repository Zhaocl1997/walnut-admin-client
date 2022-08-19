import type {
  DescriptionsProps,
  DescriptionItemProps,
  TagProps,
  TextProps,
} from 'naive-ui'

import { props } from './props'

type WDescTypeTag = {
  type: 'tag'
  typeProps: TagProps
}

type WDescTypeLink = {
  type: 'link'
  typeProps: TextProps & {
    link: string
  }
}

type WDescTypeJson = {
  type: 'json'
}

type WDescTypeDict = {
  type: 'dict'
  dictType: string
}

type WDescItemExtend = {
  value: StringOrNumber
  formatter: (val: string) => string
}

export type WDescriptionsItem = DescriptionItemProps &
  Partial<WDescTypeTag | WDescTypeLink | WDescTypeJson | WDescTypeDict> &
  WDescItemExtend

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDescriptionProps extends DescriptionsProps, ExtendProps {}
