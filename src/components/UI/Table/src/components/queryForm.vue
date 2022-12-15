<script lang="ts" setup>
import { useTableContext } from '../hooks/useTableContext'

const { tableProps, ApiTableListParams, onApiTableQuery, onApiTableReset }
    = useTableContext()

// @ts-expect-error
// @link https://stackoverflow.com/questions/57798016/how-to-ignore-type-instantiation-is-excessively-deep-and-possibly-infinite-ts
const [register] = useForm({
  ...tableProps.value?.queryFormProps!,
  // @ts-expect-error
  disabled: computed(() => tableProps.value.loading),
})
</script>

<template>
  <w-form
    :model="ApiTableListParams.query"
    @hook="register"
    @query="onApiTableQuery"
    @reset="onApiTableReset"
  />
</template>
