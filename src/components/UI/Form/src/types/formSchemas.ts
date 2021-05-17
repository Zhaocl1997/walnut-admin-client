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
  SwitchSchema,
} from './formSchemasItem'

/**
 * @description Form schema item interface
 */
export type WFormSchemaItem<D = Recordable> =
  | RenderSchema<D> // JSX
  | SlotSchema<D> // Slot
  | ButtonSchema<D>
  | ButtonGroupSchema<D>
  | InputSchema<D>
  | InputNumberSchema<D>
  | SelectSchema<D>
  | CheckboxSchema<D>
  | RadioSchema<D>
  | TreeSchema<D>
  | SelectTreeSchema<D>
  | SwitchSchema<D>
