<script lang="ts" setup>
import type { IAppNotAuthorizedProps } from '.'

defineOptions({
  name: 'AppNotAuthorized',
})

defineProps<IAppNotAuthorizedProps>()
</script>

<template>
  <div
    class="flex items-center justify-center border border-gray-500/50"
    :style="{ height: presetHeight, width: presetWidth }"
  >
    <n-result
      status="403"
      :title="$t('app.authorize.tip.title')"
      :description="$t('app.authorize.tip.desc')"
    />
  </div>
</template>
