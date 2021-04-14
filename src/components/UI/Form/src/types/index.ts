export enum FORM_TYPE {
  BUTTON = 'Button',
  BUTTONGROUP = 'ButtonGroup',
  INPUT = 'Input',
  INPUTNUMBER = 'InputNumber',
  SELECT = 'Select',
  CHECKBOX = 'Checkbox',
  RADIO = 'Radio',
  TREE = 'Tree',
  SELECTTREE = 'SelectTree',
  // INPUTNUMBER = 'InputNumber',
  // RADIO = 'Radio',
  // SLIDER = 'Slider',
  // SWITCH = 'Switch',
}

export type WFormSchemaItemType =
  | 'Button'
  | 'ButtonGroup'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'Checkbox'
  | 'Radio'
  | 'Tree'
  | 'SelectTree'

export * from './formItem'
export * from './formMethods'
export * from './formProps'
export * from './formSchemas'
