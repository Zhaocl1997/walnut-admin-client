import type { ICompExtraJSONProps } from '@/components/Extra/JSON'
import type { DescriptionItemProps, DescriptionsProps, TagProps, TextProps } from 'naive-ui'

export { default } from './index.vue'

export interface ICompUIDescTypeTag {
  type: 'tag'
  typeProps: TagProps
}

export interface ICompUIDescTypeLink {
  type: 'link'
  typeProps: TextProps & {
    link: string
  }
}

export interface ICompUIDescTypeJson {
  type: 'json'
  typeProps: ICompExtraJSONProps
}

export interface ICompUIDescTypeDict {
  type: 'dict'
  dictType: string
}

export interface ICompUIDescItemExtend<T> {
  key?: string
  show?: boolean
  value: StringOrNumber
  formatter?: (val: StringOrNumber, record?: T) => string
}

export type ICompUIDescriptionsItem<D = any> = DescriptionItemProps & ICompUIDescItemExtend<D> &
  (Partial<ICompUIDescTypeTag | ICompUIDescTypeLink | ICompUIDescTypeJson> | ICompUIDescTypeDict)

export interface ICompUIDescriptionProps extends /* @vue-ignore */ DescriptionsProps {
  items: ICompUIDescriptionsItem[]
  colon?: boolean
}
