<template>
  <WCRUD v-if="!hasQuery" @hook="register"></WCRUD>
  <div v-else>
    <n-card>
      <n-page-header :title="$route.query.name" @back="onBack"></n-page-header>
    </n-card>
    <WCRUD @hook="register"></WCRUD>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Dict',
  })
</script>

<script lang="ts" setup>
  import { useRouterQuery } from '/@/hooks/core/useRouterQuery'

  import { useDictTypeRegister } from './dictType'
  import { useDictDataRegister } from './dictData'

  const { query, hasQuery } = useRouterQuery()

  let register: Fn

  if (!hasQuery) {
    register = useDictTypeRegister()
  } else {
    register = useDictDataRegister(query.id as string)
  }

  const onBack = () => {
    useRouterPush({ name: 'Dict' })
  }
</script>

<style lang="scss" scoped></style>
