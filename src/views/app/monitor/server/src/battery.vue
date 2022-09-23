<template>
  <w-card
    :title="t('app.monitor.server.battery')"
    size="small"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    header-preset="refresh"
    :loading="loading"
    @refresh="onInit"
  >
    <w-descriptions
      v-if="!loading"
      size="small"
      label-placement="left"
      bordered
      :column="1"
      :items="items"
      :label-style="{ width: '45%' }"
    ></w-descriptions>

    <n-space v-else vertical size="small">
      <n-skeleton
        v-for="i in 4"
        :key="i"
        size="small"
        height="36px"
        width="100%"
        :sharp="false"
      ></n-skeleton>
    </n-space>
  </w-card>
</template>

<script lang="ts" setup>
  import type { WDescriptionsItem } from '@/components/UI/Descriptions'

  import type { IServerInfo } from '@/api/app/monitor/server'
  import { getBatteryInfo } from '@/api/app/monitor/server'

  const { t } = useAppI18n()

  const info = ref<IServerInfo.Battery>()
  const loading = ref(false)

  const items = computed<WDescriptionsItem[]>(() =>
    Object.entries(info.value ?? {}).map(([k, v]) => ({
      label: t(`app.monitor.server.battery.${k}`),
      value: v,
    }))
  )

  const onInit = async () => {
    loading.value = true

    try {
      const res = await getBatteryInfo()

      info.value = res
    } finally {
      loading.value = false
    }
  }

  onMounted(onInit)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppMonitorServerBattery',

    defaultView: false,
  })
</script>
