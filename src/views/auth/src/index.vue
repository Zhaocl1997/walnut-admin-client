<script lang="ts" setup>
import type { TabsInst } from 'naive-ui'

import SignInWithAccount from './common/account.vue'
import SignInWitSMS from './common/SMS.vue'
import SignInWitEmail from './common/email.vue'
import SignInWithQR from './common/QR.vue'

import SharedOther from './shared/other.vue'

import { setAuthContext } from './hooks/useAuthContext'

const { t, locale } = useAppI18n()

const tabsInstRef = ref<TabsInst>()
const account = ref<{ setFormData: (n: string, p: string) => Record<string, never> }>()
const appAuthSettings = useAppStoreSettingBackend()

const loading = ref(false)

watch(
  () => [locale, appAuthSettings.auth],
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

<template>
  <div class="text-center w-full">
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
        v-if="appAuthSettings.getAccountEnabled"
        name="account"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.account')"
      >
        <SignInWithAccount
          ref="account"
          class="w-72 text-justify mt-2"
        />
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getPhoneEnabled"
        name="SMS"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.sms')"
      >
        <SignInWitSMS class="w-72 text-justify mt-2" />
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getEmailEnabled"
        name="email"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.email')"
      >
        <SignInWitEmail class="w-72 text-justify mt-2" />
      </n-tab-pane>

      <n-tab-pane
        v-if="appAuthSettings.getQrcodeEnabled"
        name="QR"
        display-directive="show:lazy"
        :tab="t('form.app.auth.tab.qr')"
      >
        <SignInWithQR class="w-72 text-justify mt-2" />
      </n-tab-pane>
    </n-tabs>

    <SharedOther />
  </div>
</template>
