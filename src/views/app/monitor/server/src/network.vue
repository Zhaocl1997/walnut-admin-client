<script lang="ts" setup>
import type { IServerInfo } from '@/api/app/monitor/server'

import type { ICompUIDescriptionsItem } from '@/components/UI/Descriptions'
import { getNetworkInfo } from '@/api/app/monitor/server'

defineOptions({
  name: 'AppMonitorServerNetwork',
  defaultView: false,
})

const props = defineProps<{ networkPermission: string }>()

const { t } = useAppI18n()

const info = ref<IServerInfo.Network>()
const loading = ref(false)

const items = computed<ICompUIDescriptionsItem[]>(() =>
  Object.entries(info.value ?? {}).map(([k, v]) => ({
    label: t(`app.monitor.server.network.${k}`),
    value: v,
  })),
)

async function onInit() {
  loading.value = true

  try {
    const res = await getNetworkInfo(props.networkPermission)

    info.value = res
  }
  finally {
    loading.value = false
  }
}

onMounted(onInit)
</script>

<template>
  <WCard
    :title="t('app.monitor.server.network')"
    size="small"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    header-preset="refresh"
    :loading="loading"
    @refresh="onInit"
  >
    <WDescriptions
      v-if="!loading"
      size="small"
      label-placement="left"
      bordered
      :column="1"
      :items="items"
      :label-style="{ width: '45%' }"
    />

    <n-space v-else vertical size="small">
      <n-skeleton
        v-for="i in 4"
        :key="i"
        size="small"
        height="36px"
        width="100%"
        :sharp="false"
      />
    </n-space>
  </WCard>
</template>
