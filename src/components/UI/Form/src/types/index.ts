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

export * from './formItem'
export * from './formMethods'
export * from './formProps'
export * from './formSchemas'
export * from './formSchemasItem'
