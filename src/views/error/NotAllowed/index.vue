<script lang="ts" setup>
defineOptions({
  name: 'AppDeviceNotAllowed',
})

const type = useRouterQuery('type')

function onContactAdmin() {
  useAppMsgSuccess()
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center bg-bodyColor">
    <n-result
      status="info"
      :title="$t('app.base.notAllowed')"
      :description="$t('app.base.notAllowedDetail', { type: $t(`app.base.${type}`) })"
    >
      <template #footer>
        <n-button type="warning" @click="onContactAdmin">
          {{ $t('app.base.contactAdmin') }}
        </n-button>
      </template>
    </n-result>
  </div>
</template>
