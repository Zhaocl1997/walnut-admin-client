import type {
  DescriptionProps,
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

type WDescValue = {
  value: StringOrNumber
}

export type WDescriptionsItem = DescriptionItemProps &
  Partial<WDescTypeTag | WDescTypeLink> &
  WDescValue

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDescriptionProps extends DescriptionProps, ExtendProps {}
