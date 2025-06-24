<script lang="ts" setup>
import { authCapApiEndpoint } from '@/api/app/capjs'

defineOptions({
  name: 'WCompBusinessCap',
  inheritAttrs: false,
})

const appCapJSToken = useAppStoreCapJSToken()

function onCapSolve(e: { detail: { token: string } }) {
  const token = e.detail.token

  appCapJSToken.setCapJSToken(token)
  appCapJSToken.onCapSuccess!(token)
  appCapJSToken.onCloseCapModal()
}
</script>

<template>
  <WModal
    v-model:show="appCapJSToken.capShow"
    :close-on-esc="false"
    :closable="false"
    :mask-closable="false"
    :default-button="false"
    :fullscreen="false"
    display-directive="show"
    :title="$t('app.base.cap')"
    width="330px"
  >
    <cap-widget id="walnut-admin-cap" :data-cap-api-endpoint="authCapApiEndpoint" @solve="onCapSolve" />
  </WModal>
</template>
