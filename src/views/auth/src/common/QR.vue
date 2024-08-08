<script lang="ts" setup>
const { t } = useAppI18n()

const getUrl = () => `https://www.baidu.com/?t=${Date.now()}`

const url = ref(getUrl())

function onRefreshQRCode(cb: Fn) {
  url.value = getUrl()

  cb()
}
</script>

<script lang="ts">
// https://www.cnblogs.com/Arunoido/p/13937030.html?ivk_sa=1024320u
export default defineComponent({
  name: 'SignInWithQR',

  defaultView: false,
})
</script>

<template>
  <div class="mt-4 vstack items-center justify-center gap-y-2">
    <WQRCode
      :url="url"
      :expire-seconds="5"
      @refresh="onRefreshQRCode"
    />

    <span class="break-all">{{ t('form.app.auth.scan') }}</span>
  </div>
</template>
