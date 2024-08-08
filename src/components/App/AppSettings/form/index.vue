<script lang="ts" setup>
import { modalColor } from '../shared'

import SettingsFormApp from './app.vue'
import SettingsFormLogo from './logo.vue'
import SettingsFormHeader from './header.vue'
import SettingsFormTab from './tab.vue'
import SettingsFormBreadcrumb from './breadcrumb.vue'
import SettingsFormMenu from './menu.vue'
import SettingsFormFooter from './footer.vue'

const appSetting = useAppStoreSetting()

const keys = ['app', 'logo', 'header', 'tabs', 'breadcrumb', 'menu', 'footer']

const { copy, copied } = useClipboard({
  source: computed(() =>
    JSON.stringify(
      {
        app: appSetting.app,
        logo: appSetting.logo,
        header: appSetting.header,
        tabs: appSetting.tabs,
        breadcrumb: appSetting.breadcrumb,
        menu: appSetting.menu,
        footer: appSetting.footer,
      },
      null,
      4,
    ),
  ),
  copiedDuring: 8000,
})

function onReset() {
  window.location.reload()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'AppSettingsForm',
})
</script>

<template>
  <div>
    <SettingsFormApp />
    <SettingsFormLogo />
    <SettingsFormHeader />
    <SettingsFormTab />
    <SettingsFormBreadcrumb />
    <SettingsFormMenu />
    <SettingsFormFooter />

    <div class="sticky bottom-0 z-50" :style="{ background: modalColor }">
      <n-button
        type="primary"
        class="w-full"
        icon-placement="right"
        :disabled="copied"
        @click="copy()"
      >
        {{
          copied
            ? $t('form.app.settings.app.copy.helpMsg')
            : $t('form.app.settings.app.copy')
        }}
      </n-button>

      <n-button type="error" class="mt-2 w-full" @click="onReset">
        {{ $t('form.app.settings.app.reset') }}
      </n-button>
    </div>
  </div>
</template>
