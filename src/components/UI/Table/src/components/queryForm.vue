<template>
  <w-form
    @hook="register"
    @query="onApiTableQuery"
    @reset="onApiTableReset"
    :model="ApiTableListParams.query"
  ></w-form>
</template>

<script lang="ts" setup>
  import { useTableContext } from '../hooks/useTableContext'

  const { tableProps, ApiTableListParams, onApiTableQuery, onApiTableReset } =
    useTableContext()

  // @ts-ignore
  // @link https://stackoverflow.com/questions/57798016/how-to-ignore-type-instantiation-is-excessively-deep-and-possibly-infinite-ts
  const [register] = useForm({
    ...tableProps.value?.queryFormProps!,
    // @ts-ignore
    disabled: computed(() => tableProps.value.loading),
  })
</script>
