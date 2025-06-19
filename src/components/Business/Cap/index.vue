<script lang="ts" setup>
defineOptions({
  name: 'WCompBusinessCap',
  inheritAttrs: false,
})

const emits = defineEmits<{ success: [token: string] }>()

const { httpUrl } = useAppEnvProxy()

const show = ref(false)

function onCapSolve(e: { detail: { token: string } }) {
  const token = e.detail.token

  emits('success', token)
}

defineExpose({
  onStartCap: () => {
    show.value = true
  },
})
</script>

<template>
  <WModal
    v-model:show="show"
    :close-on-esc="false"
    :closable="false"
    :mask-closable="false"
    :default-button="false"
    :fullscreen="false"
    :title="$t('app.base.cap')"
    width="330px"
  >
    <cap-widget id="cap" :data-cap-api-endpoint="`${httpUrl}/auth/cap/`" @solve="onCapSolve" />
  </WModal>
</template>
