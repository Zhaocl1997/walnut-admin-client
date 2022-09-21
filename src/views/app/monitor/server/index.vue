<template>
  <div class="flex flex-wrap">
    <w-card
      class="md:w-1/2 xl:w-1/2 pt-1 px-1 md:pr-1"
      :title="t('server.cpu')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="1"
        :items="item1"
      ></w-descriptions>
    </w-card>

    <w-card
      class="md:w-1/2 xl:w-1/2 pt-1 px-1 md:pr-1"
      :title="t('server.mem')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="1"
        :items="item2"
      ></w-descriptions>
    </w-card>

    <w-card
      class="md:w-1/2 xl:w-1/2 pt-1 px-1 md:pr-1"
      :title="t('server.os')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="1"
        :items="item3"
      ></w-descriptions>
    </w-card>

    <w-card
      class="md:w-1/2 xl:w-1/2 pt-1 px-1 md:pr-1"
      :title="t('server.mem')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="1"
        :items="item2"
      ></w-descriptions>
    </w-card>
  </div>
</template>

<script lang="ts" setup>
  import type { WDescriptionsItem } from '@/components/UI/Descriptions'
  import { getAppMonitorServerInfo } from '@/api/app/monitor/server'

  const { t } = useAppI18n()

  const item1 = ref<WDescriptionsItem[]>([])
  const item2 = ref<WDescriptionsItem[]>([])
  const item3 = ref<WDescriptionsItem[]>([])

  const onInit = async () => {
    // const res = await getAppMonitorServerInfo()
    const res = {
      cpu: {
        total: 8,
        usage: 24.45,
        free: 69.28999999999999,
        model: 'Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz',
      },
      memory: {
        totalMemMb: 16216.74,
        usedMemMb: 9220.91,
        freeMemMb: 6995.83,
        usedMemPercentage: 56.86,
        freeMemPercentage: 43.14,
      },
      os: {
        platform: 'win32',
        uptime: 580893,
        ip: '192.168.3.69',
        hostname: 'DESKTOP-53KHIPB',
        type: 'Windows_NT',
        arch: 'x64',
        version: 'Windows 10 Home',
      },
    }

    console.log(res)

    item1.value = Object.entries(res.cpu).map(([k, v]) => ({
      value: v,
      label: k,
    }))

    item2.value = Object.entries(res.memory).map(([k, v]) => ({
      value: v,
      label: k,
    }))

    item3.value = Object.entries(res.os).map(([k, v]) => ({
      value: v,
      label: k,
    }))
  }

  onMounted(onInit)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppMonitorServer',
  })
</script>
