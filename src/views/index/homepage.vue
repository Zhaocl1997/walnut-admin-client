<template>
  <div>
    Homepage

    <n-space vertical>
      <n-space>
        <n-button>Default</n-button>
        <n-button type="tertiary">Tertiary</n-button>
        <n-button type="primary">Primary</n-button>
        <n-button type="info">Info</n-button>
        <n-button type="success">Success</n-button>
        <n-button type="warning">Warning</n-button>
        <n-button type="error">Error</n-button>
      </n-space>

      <n-space>
        <n-button @click="openExternalLink('https://www.baidu.com/')">
          Open external link safely
        </n-button>

        <n-button
          type="tertiary"
          @click="downloadByData('this is stream'.repeat(1000), 'stream.txt')"
        >
          download(stream)
        </n-button>

        <n-button
          type="primary"
          @click="
            downloadByUrl({
              url: 'https://iot-avatar.oss-cn-hangzhou.aliyuncs.com/street.jpg',
            })
          "
        >
          download(url)
        </n-button>

        <n-button type="info" @click="onBase64"> download(base64) </n-button>
      </n-space>

      <WAppAuthorize value="system:user:create">
        <div class="bg-red-800">test authorize</div>
      </WAppAuthorize>
    </n-space>

    <div v-for="i in 300" :key="i">
      {{ i }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { openExternalLink } from '/@/utils/window/open'
  import {
    downloadByUrl,
    downloadByData,
    downloadByBase64,
  } from '/@/utils/file/download'
  import { urlToBase64 } from '/@/utils/file/base64'

  const onBase64 = async () => {
    const base64 = await urlToBase64('/assets/logo.png')

    downloadByBase64(base64, 'logo.png')
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',
  })
</script>

<style lang="scss" scoped></style>
