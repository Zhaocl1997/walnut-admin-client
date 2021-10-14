<template>
  <div></div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Redirect',

    setup() {
      const { currentRoute, replace } = useAppRouter()

      const { params, query } = currentRoute.value
      const { path } = params

      const _path = Array.isArray(path) ? path.join('/') : path

      replace({
        path: '/' + _path,
        query,
      })

      return {}
    },
  })
</script>

<style lang="scss" scoped></style>
