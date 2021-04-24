<template>
  <el-card>
    <template #header>
      <w-title show-left>Axios Demo</w-title>
    </template>

    <el-button @click="onAddCached">Add Cached Request</el-button>
    <el-button @click="onAddNormal">Add Normal Request</el-button>

    <div class="m-4">
      <div v-for="i in count">
        <Hello :cache="cache"></Hello>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, ref, h } from 'vue'
  import { HelloAPI } from '/@/api'

  const Hello = defineComponent({
    props: {
      cache: Boolean,
    },
    setup(props) {
      const text = ref()
      const init = async () => {
        text.value = await HelloAPI(props.cache)
      }

      init()

      return () => h('div', {}, text.value)
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
