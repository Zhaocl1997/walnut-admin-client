<template>
  <w-demo-card title="QR code component, using `useQRCode`">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Basic usage</w-title>

        <WQRCode url="https://walnut-admin-doc.netlify.app/" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">With specific expired seconds</w-title>

        <WQRCode :url="url2" :expire-seconds="3" @refresh="onRefresh" />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WQRCode from '/@/components/Extra/QRCode'

  const getUrl = () => `https://www.baidu.com/?t=${Date.now()}`

  const url2 = ref(getUrl())

  const onRefresh = (cb: Fn) => {
    url2.value = getUrl()
    cb()
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'QRCodeDemo',

    defaultView: false,
  })
</script>
