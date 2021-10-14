<template>
  <w-demo-card title="Axios Demo(watch network tab on devtool)">
    <n-space size="small">
      <n-button @click="onAddNormal">Add Normal Request</n-button>

      <n-button @click="onAddCached" type="info">Add Cached Request</n-button>
    </n-space>

    <div class="m-4">
      <div v-for="i in count">
        <Hello :cache="cache">{{ i }}</Hello>
      </div>
    </div>
  </w-demo-card>
</template>

<script lang="ts">
  import { HelloAPI } from '/@/api'

  const Hello = defineComponent({
    props: {
      cache: Boolean,
    },
    setup(props, { slots }) {
      const text = ref()
      const init = async () => {
        const res = await HelloAPI(props.cache)
        text.value = res.text
      }

      init()

      return () =>
        h('div', {}, text.value + '   ' + slots.default!()[0].children)
    },
  })

  export default defineComponent({
    name: 'AxiosDemo',

    components: { Hello },

    setup() {
      const count = ref(10)
      const cache = ref(true)

      const onAddCached = () => {
        cache.value = true
        count.value += 1
      }

      const onAddNormal = () => {
        cache.value = false
        count.value += 1
      }

      return {
        count,
        cache,
        onAddCached,
        onAddNormal,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
