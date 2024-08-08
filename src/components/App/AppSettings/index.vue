<script lang="ts" setup>
import AppSettingsForm from './form/index.vue'

defineOptions({
  name: 'AppSettings',
})

const show = ref(false)
</script>

<template>
  <div
    id="walnut-settings"
    class="fixed bottom-20 right-20 cursor-pointer hover:text-primaryHover"
    style="z-index: 1999"
  >
    <w-icon
      height="36"
      icon="ant-design:setting-outlined"
      @click="() => (show = true)"
    />
  </div>

  <w-drawer
    v-model:show="show"
    :width="350"
    display-directive="show"
    :title="$t('app.settings.title')"
    :default-button="false"
    @yes="() => (show = false)"
    @no="() => (show = false)"
  >
    <AppSettingsForm />
  </w-drawer>
</template>
