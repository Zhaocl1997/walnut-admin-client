<script lang="ts" setup>
const getUrl = () => `https://www.baidu.com/?t=${Date.now()}`

const url = ref(__APP_INFO__.urls.doc)

const url2 = ref(getUrl())
const success = ref(false)

const onRefresh = (callback: Fn) => {
  url2.value = getUrl()
  callback()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'QRCodeDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="QR code component, using `useQRCode`">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <WQRCode :url="url" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          With specific expired seconds
        </w-title>

        <WQRCode :url="url2" :expire-seconds="3" @refresh="onRefresh" />
      </n-list-item>

      <n-list-item>
        <n-space vertical size="small">
          <w-title prefix="bar">
            Success
          </w-title>

          <n-button @click="success = !success">
            make it success
          </n-button>

          <WQRCode :url="url" :success="success" />
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
