<template>
  <div class="text-center w-full">
    <n-tabs
      ref="tabsInstRef"
      :bar-width="28"
      animated
      default-value="account"
      pane-class="min-h-64"
      type="line"
      justify-content="space-around"
    >
      <n-tab-pane name="account" :tab="t('form:app:signin:tab:account')">
        <SignInWithAccount class="w-72 text-justify mt-2" />
      </n-tab-pane>

      <n-tab-pane name="SMS" :tab="t('form:app:signin:tab:sms')">
        <SignInWitSMS class="w-72 text-justify mt-2" />
      </n-tab-pane>

      <n-tab-pane name="QR" :tab="t('form:app:signin:tab:qr')">
        <SignInWithQR class="w-72 text-justify mt-2" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
  import type { TabsInst } from 'naive-ui'

  import SignInWithAccount from './account.vue'
  import SignInWitSMS from './SMS.vue'
  import SignInWithQR from './QR.vue'

  const { t, locale } = useAppI18n()

  const tabsInstRef = ref<Nullable<TabsInst>>(null)

  watch(locale, () => nextTick(() => tabsInstRef.value?.syncBarPosition()))
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AuthSignin',

    defaultView: false,
  })
</script>
