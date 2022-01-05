<template>
  <div>
    Homepage

    <pre>{{ app }}</pre>
    <pre>{{ p }}</pre>
    <pre>{{ history }}</pre>
    <n-button @click="on1">1</n-button>
    <n-button @click="on2">2</n-button>
    <n-button @click="on3">3</n-button>
    <n-button @click="on4">4</n-button>

    <WAppAuthorize value="system:user:create">
      <div class="bg-red-800">test authorize</div>
    </WAppAuthorize>

    <div v-for="i in 500" :key="i">Homepage</div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props, ctx) {
      const { app, token } = useAppState()

      const p = ref({
        query: {},
        sort: [],
        page: {
          page: 1,
          pageSize: 10,
        },
      })
      const { history, reset } = useManualRefHistory(p, {
        clone: true,
      })

      return {
        app,
        token,
        p,
        history,
        on1: () => {
          p.value.page.page += 1
        },
        on2: () => {
          p.value.query.test = '123'
        },
        on3: () => {
          p.value.sort[0] = { test1: '123', test2: 123 }
        },
        on4: () => reset(),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
