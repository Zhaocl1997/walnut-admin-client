<script lang="ts" setup>
import type { TabsInst } from 'naive-ui'

import SignInWithAccount from './common/account.vue'
import SignInWitEmail from './common/email.vue'
import SignInWithQR from './common/QR.vue'
import SignInWitSMS from './common/SMS.vue'

import { setAuthContext } from './hooks/useAuthContext'

import SharedOther from './shared/other.vue'

defineOptions({
  name: 'AuthSignin',
  defaultView: false,
})

const { t, locale } = useAppI18n()

const tabsInstRef = ref<TabsInst>()
const account = ref<{ setFormData: (n: string, p: string) => Record<string, never> }>()
const appBackendSettings = useAppStoreSettingBackend()

const loading = ref(false)

watch(
  () => [locale, appBackendSettings.auth],
  () => nextTick(() => tabsInstRef.value?.syncBarPosition()),
  {
    deep: true,
    immediate: true,
  },
)

defineExpose({
  setFormData: (n: string, p: string) => account.value?.setFormData(n, p),
})

setAuthContext({ loading })
</script>

<template>
  <div class="w-full text-center">
    <n-tabs
      ref="tabsInstRef"
      :bar-width="28"
      animated
      default-value="account"
      pane-class="h-60"
      type="line"
      justify-content="space-around"
    >
      <n-tab-pane
        v-if="appBackendSettings.getAccountEnabled"
        name="account"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.account')"
      >
        <SignInWithAccount
          ref="account"
          class="mt-2 w-72 text-justify"
        />
      </n-tab-pane>

      <n-tab-pane
        v-if="appBackendSettings.getPhoneEnabled"
        name="SMS"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.sms')"
      >
        <SignInWitSMS class="mt-2 w-72 text-justify" />
      </n-tab-pane>

      <n-tab-pane
        v-if="appBackendSettings.getEmailEnabled"
        name="email"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.email')"
      >
        <SignInWitEmail class="mt-2 w-72 text-justify" />
      </n-tab-pane>

      <n-tab-pane
        v-if="appBackendSettings.getQrcodeEnabled"
        name="QR"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.qr')"
      >
        <SignInWithQR class="mt-2 w-72 text-justify" />
      </n-tab-pane>
    </n-tabs>

    <SharedOther />
  </div>
</template>
