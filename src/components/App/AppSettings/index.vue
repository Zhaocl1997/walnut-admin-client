<template>
  <div
    ref="el"
    :style="style"
    class="fixed cursor-pointer hover:text-primary"
    @click.stop
  >
    <w-icon
      id="walnut-settings"
      height="32"
      icon="ant-design:setting-outlined"
      @click.prevent="() => (show = true)"
      :style="{ zIndex: 9999 }"
    ></w-icon>
  </div>

  <w-drawer
    v-model:show="show"
    :width="350"
    :title="t('app.settings.title')"
    @yes="() => (show = false)"
    @no="() => (show = false)"
  >
    <SettingsFormTheme></SettingsFormTheme>
    <SettingsFormApp></SettingsFormApp>
    <SettingsFormMenu></SettingsFormMenu>
    <SettingsFormHeader></SettingsFormHeader>
    <SettingsFormBreadcrumb></SettingsFormBreadcrumb>
    <SettingsFormTab></SettingsFormTab>

    <n-button
      type="primary"
      class="w-full"
      @click="copy()"
      icon-placement="right"
    >
      {{ copied ? t('form.app.app.copy.success') : t('form.app.app.copy') }}
      <template v-if="copied" #icon>
        <w-message :msg="t('form.app.app.copy.helpMsg')"></w-message>
      </template>
    </n-button>

    <n-button type="warning" class="w-full mt-2" @click="onReset">
      {{ t('form.app.app.reset') }}
    </n-button>
  </w-drawer>
</template>

<script lang="ts" setup>
  import { clone } from 'lodash-es'

  import { appSetting } from './shared'

  import AppSettingsFromJson from '@/settings.json'

  const { t } = useAppI18n()

  const show = ref(false)

  const { el, style } = useDraggableElement()

  const { copy, copied } = useClipboard({
    source: computed(() => JSON.stringify(appSetting.settings, null, 4)),
    copiedDuring: 8000,
  })

  const onReset = () => {
    appSetting.settings = clone(AppSettingsFromJson as AppSettings)

    // simple and violent
    localStorage.clear()
    location.reload()
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppSettings',

    components: {
      SettingsFormTheme: createAsyncComponent(() => import('./form/theme.vue')),
      SettingsFormApp: createAsyncComponent(() => import('./form/app.vue')),
      SettingsFormMenu: createAsyncComponent(() => import('./form/menu.vue')),
      SettingsFormHeader: createAsyncComponent(
        () => import('./form/header.vue')
      ),
      SettingsFormBreadcrumb: createAsyncComponent(
        () => import('./form/breadcrumb.vue')
      ),
      SettingsFormTab: createAsyncComponent(() => import('./form/tab.vue')),
    },
  })
</script>
