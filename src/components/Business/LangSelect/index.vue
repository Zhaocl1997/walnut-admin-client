<script lang="ts" setup>
import { langAPI } from '@/api/system/lang'
import ApiSelect from '@/components/Advanced/ApiSelect'

defineOptions({
  name: 'WBusinessLangSelect',
})

const listFn = langAPI.list.bind(langAPI)
const readFn = langAPI.read.bind(langAPI)
</script>

<template>
  <ApiSelect
    :list-fn="listFn"
    :read-fn="readFn"
    value-field="_id"
    label-field="lang"
  />
</template>
