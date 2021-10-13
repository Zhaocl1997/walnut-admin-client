// import type {
//   UnwrapRef,
//   VNode,
//   AllowedComponentProps,
//   ComponentCustomProps,
//   VNodeProps,
// } from 'vue'

// import type {
//   RouterLink,
//   RouterView,
//   useLink,
//   RouteLocationNormalized,
// } from 'vue-router'

// import type { WFormProps } from '../src/components/UI/Form'
// import type { WTable } from '../src/components/UI/Table'

// declare const WFormComp: new () => {
//   $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & WFormProps
// }

// declare const WTableComp: new () => {
//   $props: AllowedComponentProps &
//     ComponentCustomProps &
//     VNodeProps &
//     WTable.Props
// }

// declare module 'vue' {
//   export interface GlobalComponents {
//     // https://github.com/johnsoncodehk/volar
//     RouterLink: typeof RouterLink & {
//       __VLS_slots: {
//         default: UnwrapRef<ReturnType<typeof useLink>>
//       }
//     }

//     RouterView: typeof RouterView & {
//       __VLS_slots: {
//         default: {
//           Component: VNode
//           route: RouteLocationNormalized & { href: string }
//         }
//       }
//     }

//     // Here is where we enhance typing support in template usage
//     // Components below are not actually global components
//     // Usage of `vite-plugin-components` make these seem like global comps
//     // 'w-button': import('../src/components/UI/Button').WButtonProps
//     // 'w-button-group': import('../src/components/UI/ButtonGroup').WButtonGroupProps
//     // 'w-checkbox': import('../src/components/UI/Checkbox').WCheckboxProps
//     // 'w-check-tag': import('/@/components/UI/CheckTag').WCheckTagProps
//     // 'w-dialog': import('/@/components/UI/Dialog').WDialogProps
//     // 'w-dropdown': import('/@/components/UI/Dropdown').WDropdownProps
//     // 'w-empty': import('/@/components/UI/Empty').WEmptyProps

//     // // type support for slot
//     // 'w-form': typeof WFormComp & {
//     //   __VLS_slots: {
//     //     [key: string]: WFormProps
//     //   }
//     // }

//     // 'w-icon': import('/@/components/UI/Icon').WIconProps
//     // 'w-input': import('../src/components/UI/Input').WInputProps
//     // 'w-input-number': import('../src/components/UI/InputNumber').WInputNumberProps
//     // 'w-pagination': import('/@/components/UI/Pagination').WPaginationProps
//     // 'w-radio': import('../src/components/UI/Radio').WRadioProps
//     // 'w-scrollbar': import('/@/components/UI/Scrollbar').WScrollProps
//     // 'w-select': import('../src/components/UI/Select').WSelectProps
//     // 'w-select-tree': import('/@/components/UI/SelectTree').WSelectTreeProp
//     // 'w-switch': import('../src/components/UI/Switch').WSwitchProps

//     // // type support for slot
//     // 'w-table': typeof WTableComp & {
//     //   __VLS_slots: {
//     //     [key: string]: WTable.ElTable.SlotData
//     //   }
//     // }

//     // 'w-tree': import('/@/components/UI/Tree').WTreeProps
//   }
// }

// export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']

    WIcon: import('/@/components/UI/Icon').WIconProps
  }
}

export {}
