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

  const { tableProps, onInit, initParams, tableRef } = useTableContext()

  const onQuery = async ({ done }: any) => {
    initParams.value.page = 1

    await onInit()
    done()
  }

  const onReset = async ({ done }: any) => {
    Object.entries(initParams.value).map(([k, v]) => {
      initParams.value[k] = ''
    })

    initParams.value.page = 1
    initParams.value.pageSize = 10

    await onInit()
    done()
  }

  // @ts-ignore
  // @link https://stackoverflow.com/questions/57798016/how-to-ignore-type-instantiation-is-excessively-deep-and-possibly-infinite-ts
  const [register] = useForm({ ...tableProps.value?.queryFormProps! })
</script>
