<script lang="ts" setup>
import AppMonitorServerCPU from './src/cpu.vue'
import AppMonitorServerMem from './src/mem.vue'
import AppMonitorServerOS from './src/os.vue'
import AppMonitorServerSystem from './src/system.vue'
import AppMonitorServerDisk from './src/disk.vue'
import AppMonitorServerBattery from './src/battery.vue'
import AppMonitorServerTime from './src/time.vue'
import AppMonitorServerNetwork from './src/network.vue'

const systemPermission = ref()
const networkPermission = ref()

function onSystemAuthorizeSuccess(p: string) {
  systemPermission.value = p
}

function onNetworkAuthorizeSuccess(p: string) {
  networkPermission.value = p
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'AppMonitorServer',
})
</script>

<template>
  <n-grid
    cols="1 s:1 m:1 l:2 xl:2 2xl:2"
    :x-gap="4"
    :y-gap="4"
    responsive="screen"
  >
    <n-grid-item>
      <n-grid cols="1" :x-gap="4" :y-gap="4" responsive="screen">
        <n-grid-item>
          <w-transition name="fade-down" appear>
            <AppMonitorServerCPU />
          </w-transition>
        </n-grid-item>

        <n-grid-item>
          <w-app-authorize
            value="app:monitor:server:memory"
            preset="tip"
            preset-width="100%"
            preset-height="230px"
          >
            <w-transition name="fade-down" appear :duration="400">
              <AppMonitorServerMem />
            </w-transition>
          </w-app-authorize>
        </n-grid-item>

        <n-grid-item>
          <w-transition name="fade-down" appear :duration="500">
            <AppMonitorServerOS />
          </w-transition>
        </n-grid-item>

        <n-grid-item>
          <w-app-authorize
            value="app:monitor:server:system"
            preset="IPTC"
            preset-width="100%"
            preset-height="230px"
            @iptc-success="onSystemAuthorizeSuccess"
          >
            <w-transition name="fade-down" appear :duration="600">
              <AppMonitorServerSystem
                :system-permission="systemPermission"
              />
            </w-transition>
          </w-app-authorize>
        </n-grid-item>
      </n-grid>
    </n-grid-item>

    <n-grid-item>
      <n-grid cols="1" :x-gap="4" :y-gap="4" responsive="screen">
        <n-grid-item>
          <w-transition name="fade-down" appear :duration="700">
            <AppMonitorServerDisk />
          </w-transition>
        </n-grid-item>

        <n-grid-item>
          <w-transition name="fade-down" appear :duration="800">
            <AppMonitorServerBattery />
          </w-transition>
        </n-grid-item>

        <n-grid-item>
          <w-transition name="fade-down" appear :duration="900">
            <AppMonitorServerTime />
          </w-transition>
        </n-grid-item>

        <n-grid-item>
          <w-app-authorize
            value="app:monitor:server:network"
            preset="IPTC"
            preset-width="100%"
            preset-height="230px"
            @iptc-success="onNetworkAuthorizeSuccess"
          >
            <w-transition name="fade-down" appear :duration="1000">
              <AppMonitorServerNetwork
                :network-permission="networkPermission"
              />
            </w-transition>
          </w-app-authorize>
        </n-grid-item>
      </n-grid>
    </n-grid-item>
  </n-grid>
</template>
