<template>
  <ApiSelect
    :value="value"
    :list-fn="listFn"
    :read-fn="readFn"
    @update:value="onUpdateValue"
    value-field="_id"
    label-field="roleName"
    :multiple="multiple"
    :valueSeparator="valueSeparator"
  />
</template>

<script lang="ts" setup>
  import ApiSelect from '../ApiSelect'
  import { roleAPI } from '@/api/system/role'
  import { WithValueProps } from '@/components/HOC/WithValue'

  defineProps(WithValueProps)

  const emit = defineEmits(['update:value'])

  const onUpdateValue = (val: StringOrNumber) => {
    emit('update:value', val)
  }

  const listFn = roleAPI.list.bind(roleAPI)
  const readFn = roleAPI.read.bind(roleAPI)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WRoleSelect',
  })
</script>
