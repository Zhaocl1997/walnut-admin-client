<script lang="ts" setup>
defineOptions({
  name: 'CapDemo',
  defaultView: false,
})

const appCapJSToken = useAppStoreCapJSToken()

async function onNormalMode() {
  await appCapJSToken.onOpenCapModal(async (token) => {
    useAppMsgSuccess(token)
  })
}

async function onInvisible() {
  const token = await appCapJSToken.refreshCapJSToken()
  useAppMsgSuccess(token)
}
</script>

<template>
  <WDemoCard title="Cap">
    <n-button class="mb-2" @click="onNormalMode">
      Cap Validate
    </n-button>
    <br>
    <n-button @click="onInvisible">
      Cap Invisible Validate
    </n-button>
  </WDemoCard>
</template>
