<template>
  <div
    id="walnut-settings"
    class="fixed right-20 bottom-20 hover:text-primaryHover cursor-pointer"
    style="z-index: 1999"
  >
    <w-icon
      height="36"
      icon="ant-design:setting-outlined"
      @click="() => (show = true)"
    ></w-icon>
  </div>

  <w-drawer
    v-model:show="show"
    :width="350"
    display-directive="show"
    :title="$t('app.settings.title')"
    @yes="() => (show = false)"
    @no="() => (show = false)"
    :default-button="false"
  >
    <AppSettingsForm></AppSettingsForm>
  </w-drawer>
</template>

<script lang="ts" setup>
  import AppSettingsForm from './form/index.vue'

  const show = ref(false)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppSettings',
  })
</script>
