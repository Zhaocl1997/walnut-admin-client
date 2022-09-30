<template>
  <div class="text-center w-full">
    <n-tabs
      ref="tabsInstRef"
      :bar-width="28"
      animated
      default-value="account"
      pane-class="h-58"
      type="line"
      justify-content="space-around"
    >
      <n-tab-pane name="account" :tab="t('form.app.auth.tab.account')">
        <SignInWithAccount
          v-if="appAuthSettings.getAccountEnabled"
          ref="account"
          class="w-72 text-justify mt-2"
        ></SignInWithAccount>
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getPhoneEnabled"
        name="SMS"
        :tab="t('form.app.auth.tab.sms')"
      >
        <SignInWitSMS class="w-72 text-justify mt-2"></SignInWitSMS>
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getEmailEnabled"
        name="email"
        :tab="t('form.app.auth.tab.email')"
      >
        <SignInWitEmail class="w-72 text-justify mt-2"></SignInWitEmail>
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getQrcodeEnabled"
        name="QR"
        :tab="t('form.app.auth.tab.qr')"
      >
        <SignInWithQR class="w-72 text-justify mt-2"></SignInWithQR>
      </n-tab-pane>
    </n-tabs>

    <SharedOther></SharedOther>
  </div>
</template>

<script lang="ts" setup>
  import type { TabsInst } from 'naive-ui'

  import SignInWithAccount from './account.vue'
  import SignInWitSMS from './SMS.vue'
  import SignInWitEmail from './email.vue'
  import SignInWithQR from './QR.vue'

  import SharedOther from './shared/other.vue'

  const { t, locale } = useAppI18n()

  const tabsInstRef = ref<TabsInst>()
  const account = ref<{ setFormData: (n: string, p: string) => {} }>()
  const appAuthSettings = useAppStoreSettingBackend()

  watch(
    () => [locale, appAuthSettings.auth],
    () => nextTick(() => tabsInstRef.value?.syncBarPosition()),
    {
      deep: true,
      immediate: true,
    }
  )

  defineExpose({
    setFormData: (n: string, p: string) => account.value?.setFormData(n, p),
  })

  onMounted(async () => {
    await appAuthSettings.getAppAuthSettings()
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AuthSignin',

    defaultView: false,
  })
</script>
