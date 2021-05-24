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
  SWITCH = 'Switch',
  // SLIDER = 'Slider',
  // SWITCH = 'Switch',
}

export type WFormSchemaItemType =
  | 'Render' // JSX render type
  | 'Slot' // Slot type
  | 'Button'
  | 'ButtonGroup'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'Checkbox'
  | 'Radio'
  | 'Tree'
  | 'SelectTree'
  | 'Switch'

export * from './module'
