<template>
  <ApiSelect
    :value="value"
    :list-fn="listFn"
    :read-fn="readFn"
    @update:value="onUpdateValue"
    value-field="_id"
    label-field="roleName"
  />
</template>

<script lang="ts" setup>
  import ApiSelect from '../ApiSelect'
  import { roleAPI } from '/@/api/system/role'

  defineProps({
    value: [String, Number, Array] as PropType<
      string | number | string[] | number[] | (string & number)[]
    >,
  })

  const emit = defineEmits(['update:value'])

  const onUpdateValue = (val: StringOrNumber) => {
    emit('update:value', val)
  }

  const listFn = roleAPI.list.bind(roleAPI)
  const readFn = roleAPI.read.bind(roleAPI)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'RoleSelect',
  })
</script>
