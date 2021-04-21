<template>
  <div class="select-none w-96">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-if="$route.name !== indexName"
        :to="{ path: getIndex.path }"
      >
        <span class="text-base text-primary">{{
          getMaybeI18nMsg(getIndex.meta && getIndex.meta.title)
        }}</span>
      </el-breadcrumb-item>

      <el-breadcrumb-item v-for="route in getChildren" :key="route.path">
        <span class="text-base text-primary">{{
          getMaybeI18nMsg(route.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import { useAppRoute } from '/@/router'
  import { indexName } from '/@/router/constant'
  import { getMaybeI18nMsg } from '/@/views/system/menu/utils'

  export default defineComponent({
    name: 'HeaderBreadCrumb',

    setup() {
      const route = useAppRoute()

      const getIndex = computed(() => route.matched[0].children[0])

      const getChildren = computed(() =>
        route.matched.filter((item) => item.meta && item.meta.title)
      )

      return {
        indexName,
        getIndex,
        getChildren,
        getMaybeI18nMsg,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
