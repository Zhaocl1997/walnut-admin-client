import { computed } from 'vue'

export const useSelectTreeBindValue = (props: any, args: any) => {
  const {
    onSelectChange,

    getProps,
    onNodeClick,
    onCheckChange,
  } = args

  const getSelectBindValue = computed(() => {
    return {
      class: 'w-full',

      size: props.size,
      multiple: props.multiple,
      disabled: props.disabled,
      clearable: props.clearable,
      placeholder: props.placeholder,
      collapseTags: props.collapseTags,

      onChange: onSelectChange,
    }
  })

  const getTreeBindValue = computed(() => {
    return {
      data: props.data,
      props: getProps.value,
      multiple: props.multiple,
      accordion: props.accordion,

      onNodeClick: onNodeClick,
      onCheck: onCheckChange,
    }
  })

  return {
    getSelectBindValue,
    getTreeBindValue,
  }
}
