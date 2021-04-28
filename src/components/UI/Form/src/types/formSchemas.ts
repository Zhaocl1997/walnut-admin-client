import type {
  RenderSchema,
  SlotSchema,
  ButtonSchema,
  ButtonGroupSchema,
  InputSchema,
  InputNumberSchema,
  SelectSchema,
  CheckboxSchema,
  RadioSchema,
  TreeSchema,
  SelectTreeSchema,
} from './formSchemasItem'

/**
 * @description Form schema item interface
 */
export type WFormSchemaItem =
  | RenderSchema // JSX
  | SlotSchema // Slot
  | ButtonSchema
  | ButtonGroupSchema
  | InputSchema
  | InputNumberSchema
  | SelectSchema
  | CheckboxSchema
  | RadioSchema
  | TreeSchema
  | SelectTreeSchema
