import type { UnwrapRef, VNode } from 'vue'
import type {
  RouterLink,
  RouterView,
  useLink,
  RouteLocationNormalized,
} from 'vue-router'

declare module 'vue' {
  export interface GlobalComponents {
    // https://github.com/johnsoncodehk/volar
    RouterLink: typeof RouterLink & {
      __VLS_slots: {
        default: UnwrapRef<ReturnType<typeof useLink>>
      }
    }

    RouterView: typeof RouterView & {
      __VLS_slots: {
        default: {
          Component: VNode
          route: RouteLocationNormalized & { href: string }
        }
      }
    }

    // Here is where we enhance typing support in template usage
    'w-button': import('/@/components/UI/Button').WButtonProps
    'w-button-group': import('/@/components/UI/ButtonGroup').WButtonGroupProps
    'w-checkbox': import('/@/components/UI/Checkbox').WCheckboxProps
    'w-check-tag': import('/@/components/UI/CheckTag').WCheckTagProps
    'w-dialog': import('/@/components/UI/Dialog').WDialogProps
    'w-dropdown': import('/@/components/UI/Dropdown').WDropdownProps
    'w-empty': import('/@/components/UI/Empty').WEmptyProps
    'w-form': import('/@/components/UI/Form').WFormProps
    'w-icon': import('/@/components/UI/Icon').WIconProps
    'w-input': import('/@/components/UI/Input').WInputProps
    'w-input-number': import('/@/components/UI/InputNumber').WInputNumberProps
    'w-pagination': import('/@/components/UI/Pagination').WPaginationProps
    'w-radio': import('/@/components/UI/Radio').WRadioProps
    'w-scrollbar': import('/@/components/UI/Scrollbar').WScrollProps
    'w-select': import('/@/components/UI/Select').WSelectProps
    'w-select-tree': import('/@/components/UI/SelectTree')
    'w-table': import('/@/components/UI/Table').WTableProps
    'w-tree': import('/@/components/UI/Tree')
  }
}

export {}
