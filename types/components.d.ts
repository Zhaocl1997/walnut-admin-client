import type {
  UnwrapRef,
  VNode,
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
} from 'vue'
import type {
  RouterLink,
  RouterView,
  useLink,
  RouteLocationNormalized,
} from 'vue-router'

import type { WFormProps } from '/@/components/UI/Form'

declare const WForm: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & WFormProps
}

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
    // Components below are not actually global components
    // Usage of `vite-plugin-components` make these seem like global comps
    'w-button': import('/@/components/UI/Button').WButtonProps
    'w-button-group': import('/@/components/UI/ButtonGroup').WButtonGroupProps
    'w-checkbox': import('/@/components/UI/Checkbox').WCheckboxProps
    'w-check-tag': import('/@/components/UI/CheckTag').WCheckTagProps
    'w-dialog': import('/@/components/UI/Dialog').WDialogProps
    'w-dropdown': import('/@/components/UI/Dropdown').WDropdownProps
    'w-empty': import('/@/components/UI/Empty').WEmptyProps

    // type support for slot
    'w-form': typeof WForm & {
      __VLS_slots: {
        [key: string]: WFormProps
      }
    }

    'w-icon': import('/@/components/UI/Icon').WIconProps
    'w-input': import('/@/components/UI/Input').WInputProps
    'w-input-number': import('/@/components/UI/InputNumber').WInputNumberProps
    'w-pagination': import('/@/components/UI/Pagination').WPaginationProps
    'w-radio': import('/@/components/UI/Radio').WRadioProps
    'w-scrollbar': import('/@/components/UI/Scrollbar').WScrollProps
    'w-select': import('/@/components/UI/Select').WSelectProps
    'w-select-tree': import('/@/components/UI/SelectTree')
    'w-switch': import('/@/components/UI/Switch').WSwitchProps
    'w-table': import('/@/components/UI/Table').WTableProps
    'w-tree': import('/@/components/UI/Tree').WTreeProps
  }
}

export {}
