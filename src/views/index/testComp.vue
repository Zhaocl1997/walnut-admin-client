<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
  import { ref, SetupContext } from 'vue'
  import { defineComponent } from 'vue'
  import { HelloAPI } from '/@/api'

  export default defineComponent({
    name: 'Component',

    inheritAttrs: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx: SetupContext) {
      const text = ref()

      const init = async () => {
        text.value = await HelloAPI()
      }

      init()

      return { text }
    },
  })
</script>

<style lang="scss" scoped></style>
