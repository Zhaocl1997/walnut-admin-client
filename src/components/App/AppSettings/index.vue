<template>
  <div
    id="walnut-settings"
    class="fixed right-20 bottom-20 hover:text-primaryHover cursor-pointer"
    style="z-index: 99999"
  >
    <w-icon
      height="36"
      icon="ant-design:setting-outlined"
      @click="onOpenSettings"
    ></w-icon>
  </div>
</template>

<script lang="ts" setup>
  const appSetting = useAppStoreSetting()

  const onOpenSettings = () => {
    openSettingsWindow()
  }

  useEventListener('message', (data) => {
    AppLog('Recevied changed settings fron child window...')

    const res = JSON.parse(data.data)

    appSetting.setSettingsWithKey({ key: res.key, value: res.value })
  })

  if (import.meta.hot) {
    openSettingsWindow()
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppSettings',
  })
</script>
