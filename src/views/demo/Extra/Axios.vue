<template>
  <w-demo-card title="Axios (watch network tab on devtool)">
    <n-space size="small">
      <n-button @click="onAddNormal">Add Normal Request</n-button>

      <n-button @click="onAddCached" type="info">
        Add Cached Request (5s)
      </n-button>

      <n-button @click="onReset">Reset</n-button>
    </n-space>

    <div class="m-4">
      <div v-for="i in count">
        <Hello :cache="cache">{{ i }}</Hello>
      </div>
    </div>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import { HelloAPI } from '/@/api'

  const Hello = defineComponent({
    props: {
      cache: Boolean,
    },
    setup(props, { slots }) {
      const text = ref()
      const init = async () => {
        const res = await HelloAPI(props.cache)
        text.value = res
      }

      init()

      return () =>
        h('div', {}, text.value + '   ' + slots.default!()[0].children)
    },
  })

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

  const onReset = () => {
    count.value = 10
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AxiosDemo',

    defaultView: false,
  })
</script>
