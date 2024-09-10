<script lang="ts" setup>
import type { IAppAuthorizeProps } from '.'

defineOptions({
  name: 'AppAuthorize',
  inheritAttrs: false,
})

withDefaults(defineProps<IAppAuthorizeProps>(), {
  preset: 'null',
})

const emits = defineEmits<{ success: [] }>()

const AppAuthorizeIPTC = createAsyncComponent(() => import('./IPTC.vue'))

const userPermission = useAppStoreUserPermission()

function onSuccess() {
  emits('success')
}
</script>

<template>
  <AppAuthorizeIPTC
    v-if="preset === 'IPTC'"
    :value="value"
    :preset-height="presetHeight"
    :preset-width="presetWidth"
    @success="onSuccess"
  >
    <slot />
  </AppAuthorizeIPTC>
  <slot v-else-if="userPermission.hasPermission(value)" />
  <div v-else-if="preset === 'null'" />
  <div
    v-else-if="preset === 'tip'"
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

<style lang="scss" scoped>

</style>
