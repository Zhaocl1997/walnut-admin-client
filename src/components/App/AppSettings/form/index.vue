<template>
  <div class="w-screen h-screen bg-bodyColor overflow-auto">
    <div class="p-4 pt-0">
      <SettingsFormApp></SettingsFormApp>
      <SettingsFormLogo></SettingsFormLogo>
      <SettingsFormHeader></SettingsFormHeader>
      <SettingsFormTab></SettingsFormTab>
      <SettingsFormBreadcrumb></SettingsFormBreadcrumb>
      <SettingsFormMenu></SettingsFormMenu>
      <SettingsFormFooter></SettingsFormFooter>
    </div>

    <div
      style="z-index: 9999"
      class="sticky bottom-0 h-auto w-full bg-bodyColor p-2"
    >
      <n-button
        type="primary"
        class="w-full"
        @click="copy()"
        icon-placement="right"
        :disabled="copied"
      >
        {{
          copied
            ? $t('form.app.settings.app.copy.helpMsg')
            : $t('form.app.settings.app.copy')
        }}
      </n-button>

      <n-button type="error" class="w-full mt-2" @click="onReset">
        {{ $t('form.app.settings.app.reset') }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import settings from '@/settings.json'

  import SettingsFormApp from './app.vue'
  import SettingsFormLogo from './logo.vue'
  import SettingsFormHeader from './header.vue'
  import SettingsFormTab from './tab.vue'
  import SettingsFormBreadcrumb from './breadcrumb.vue'
  import SettingsFormMenu from './menu.vue'
  import SettingsFormFooter from './footer.vue'

  const appSetting = useAppStoreSetting()

  const keys = ['app', 'logo', 'header', 'tabs', 'breadcrumb', 'menu', 'footer']

  keys.map((key) => {
    watch(
      () => appSetting[key],
      (v) => {
        window.parent.opener.postMessage(
          JSON.stringify({ key: key, value: v }),
          location.origin
        )
      },
      {
        deep: true,
        immediate: true,
      }
    )
  })

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
        4
      )
    ),
    copiedDuring: 8000,
  })

  const onReset = () => {
    keys.map((key) => {
      appSetting.setSettingsWithKey({
        // @ts-ignore
        key: key,
        value: settings[key],
      })
    })

    // simple and violent
    // localStorage.clear()
    window.parent.opener.location.reload()
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppSettingsForm',
  })
</script>
