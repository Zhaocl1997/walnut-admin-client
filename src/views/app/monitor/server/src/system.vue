<script lang="ts" setup>
import type { WDescriptionsItem } from '@/components/UI/Descriptions'

import type { IServerInfo } from '@/api/app/monitor/server'
import { getSysInfo } from '@/api/app/monitor/server'

defineOptions({
  name: 'AppMonitorServerSystem',
  defaultView: false,
})

const props = defineProps<{ systemPermission: string }>()

const { t } = useAppI18n()

const info = ref<IServerInfo.System>()
const loading = ref(false)

const items = computed<WDescriptionsItem[]>(() =>
  Object.entries(info.value ?? {}).map(([k, v]) => ({
    label: t(`app.monitor.server.system.${k}`),
    value: v,
  })),
)

async function onInit() {
  loading.value = true

  try {
    const res = await getSysInfo(props.systemPermission)

    info.value = res
  }
  finally {
    loading.value = false
  }
}

onMounted(onInit)
</script>

<template>
  <w-card
    :title="t('app.monitor.server.system')"
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
  </w-card>
</template>
