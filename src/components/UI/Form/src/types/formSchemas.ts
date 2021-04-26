import type {
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
  | ButtonSchema
  | ButtonGroupSchema
  | InputSchema
  | InputNumberSchema
  | SelectSchema
  | CheckboxSchema
  | RadioSchema
  | TreeSchema
  | SelectTreeSchema
