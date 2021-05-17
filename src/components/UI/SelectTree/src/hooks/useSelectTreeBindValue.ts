import { computed } from 'vue'

export const useSelectTreeBindValue = (props: any) => {
  const getSelectBindValue = computed(() => {
    return {
      class: 'w-full',

      size: props.size,
      multiple: props.multiple,
      disabled: props.disabled,
      clearable: props.clearable,
      placeholder: props.placeholder,
      collapseTags: props.collapseTags,
    }
  })

  const getTreeBindValue = computed(() => {
    return {
      data: props.data,
      props: props.props,
      multiple: props.multiple,
      accordion: props.accordion,
    }
  })

  return {
    getSelectBindValue,
    getTreeBindValue,
  }
}
