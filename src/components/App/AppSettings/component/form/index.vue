<script lang="ts" setup>
import SettingsFormApp from './app.vue'
import SettingsFormBreadcrumb from './breadcrumb.vue'
import SettingsFormFooter from './footer.vue'
import SettingsFormHeader from './header.vue'
import SettingsFormLogo from './logo.vue'
import SettingsFormMenu from './menu.vue'
import SettingsFormTab from './tab.vue'
import SettingsFormThemes from './theme.vue'

defineOptions({
  name: 'WAppSettingsForm',
})

const appSetting = useAppStoreSetting()

const { copy, copied } = useClipboard({
  source: computed(() =>
    JSON.stringify(
      {
        themes: appSetting.themes,
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

const show = ref(false)

function onOpenSetting() {
  show.value = true
}

function onReset() {
  window.location.reload()
}
</script>

<template>
  <WIconButton
    :icon-props="{
      height: '24',
      icon: 'ant-design:setting-outlined',
    }"
    :button-props="{
      onClick: onOpenSetting,
    }"
    tooltip
    :tooltip-msg="$t('app.settings.tooltip.form')"
    :tooltip-props="{
      placement: 'left',
    }"
  />

  <WDrawer
    v-model:show="show"
    :width="350"
    display-directive="show"
    :title="$t('app.settings.title')"
    :default-button="false"
    @yes="() => (show = false)"
    @no="() => (show = false)"
  >
    <SettingsFormThemes />
    <SettingsFormApp />
    <SettingsFormLogo />
    <SettingsFormHeader />
    <SettingsFormTab />
    <SettingsFormBreadcrumb />
    <SettingsFormMenu />
    <SettingsFormFooter />

    <template #footer>
      <div class="w-full">
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
    </template>
  </WDrawer>
</template>
