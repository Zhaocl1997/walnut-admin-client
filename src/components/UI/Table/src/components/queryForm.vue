<script lang="ts" setup>
import { useTableContext } from '../hooks/useTableContext'

const { tablePropsCtx, apiListParams, onApiQuery, onApiReset }
    = useTableContext()

const { getProps: tableProps } = tablePropsCtx

const [register] = useForm({
  ...tableProps.value?.queryFormProps,
  disabled: computed(() => tableProps.value.loading),
})
</script>

<template>
  <WForm
    :model="apiListParams.query"
    @hook="register"
    @query="onApiQuery"
    @reset="onApiReset"
  />
</template>
