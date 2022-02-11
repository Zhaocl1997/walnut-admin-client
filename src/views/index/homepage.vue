<template>
  <div>
    Homepage

    <n-input v-model:value="value"></n-input>

    <n-button @click="onScreenShot">screen shot</n-button>

    <img :src="src" alt="" class="w-32 h-32" />

    <div v-show="show" class="w-32 h-32 text-green-600">123</div>

    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary">Tertiary</n-button>
      <n-button type="primary">Primary</n-button>
      <n-button type="info">Info</n-button>
      <n-button type="success">Success</n-button>
      <n-button type="warning">Warning</n-button>
      <n-button type="error">Error</n-button>
    </n-space>

    <WAppAuthorize value="system:user:create">
      <div class="bg-red-800">test authorize</div>
    </WAppAuthorize>

    <!-- <div v-for="i in 300" :key="i">
      {{ i }}
    </div> -->
  </div>
</template>

<script lang="ts">
  import { toJpeg } from 'html-to-image'

  export default defineComponent({
    name: 'Homepage',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props, ctx) {
      const src = ref('')
      const show = ref(false)

      const onScreenShot = useThrottleFn(() => {
        console.log(123)

        const target = document.getElementById('Homepage')

        toJpeg(target!, {
          width: target?.offsetWidth,
          height: target?.offsetHeight,
        }).then(function (dataUrl) {
          // var link = document.createElement('a')
          // link.download = 'my-image-name.jpeg'
          // link.href = dataUrl
          // link.click()
          src.value = dataUrl
        })
      }, 500)

      setInterval(() => {
        show.value = !show.value
      }, 1000)

      onUpdated(() => {
        onScreenShot()
      })

      return {
        src,
        show,
        value: ref(''),
        onScreenShot,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
