<template>
  <n-grid
    cols="1 s:2 m:2 l:2 xl:2 2xl:2"
    :x-gap="8"
    :y-gap="8"
    responsive="screen"
  >
    <n-grid-item>
      <AppMonitorServerCPU></AppMonitorServerCPU>
    </n-grid-item>

    <n-grid-item>
      <w-app-authorize
        value="app:monitor:server:memory"
        preset="tip"
        preset-width="100%"
        preset-height="230px"
      >
        <AppMonitorServerMem></AppMonitorServerMem>
      </w-app-authorize>
    </n-grid-item>

    <n-grid-item>
      <AppMonitorServerOS></AppMonitorServerOS>
    </n-grid-item>

    <n-grid-item>
      <w-app-authorize
        value="app:monitor:server:system"
        preset="IPTC"
        preset-width="100%"
        preset-height="230px"
        @iptc-success="onAuthorizeSuccess"
      >
        <AppMonitorServerSystem
          :extra-permission="extraPermission"
        ></AppMonitorServerSystem>
      </w-app-authorize>
    </n-grid-item>

    <n-grid-item>
      <AppMonitorServerDisk></AppMonitorServerDisk>
    </n-grid-item>

    <n-grid-item>
      <AppMonitorServerBattery></AppMonitorServerBattery>
    </n-grid-item>

    <n-grid-item>
      <AppMonitorServerTime></AppMonitorServerTime>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import AppMonitorServerCPU from './src/cpu.vue'
  import AppMonitorServerMem from './src/mem.vue'
  import AppMonitorServerOS from './src/os.vue'
  import AppMonitorServerSystem from './src/system.vue'
  import AppMonitorServerDisk from './src/disk.vue'
  import AppMonitorServerBattery from './src/battery.vue'
  import AppMonitorServerTime from './src/time.vue'

  const extraPermission = ref()

  const onAuthorizeSuccess = (p: string) => {
    extraPermission.value = p
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppMonitorServer',
  })
</script>
