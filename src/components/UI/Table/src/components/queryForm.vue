<template>
  <w-form
    @hook="register"
    @query="onQuery"
    @reset="onReset"
    :model="initParams"
  ></w-form>
</template>

<script lang="ts" setup>
  import { useTableContext } from '../hooks/useTableContext'

  const { tableProps, initParams, onQuery, onReset } = useTableContext()

  // @ts-ignore
  // @link https://stackoverflow.com/questions/57798016/how-to-ignore-type-instantiation-is-excessively-deep-and-possibly-infinite-ts
  const [register] = useForm({ ...tableProps.value?.queryFormProps! })
</script>
