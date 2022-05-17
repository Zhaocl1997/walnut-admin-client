<template>
  <n-card :title="t('sys:menu:account:setting')">
    <n-tabs type="card" animated>
      <n-tab-pane name="info" display-directive="show" tab="Basic Info">
        <AccountSettingTabInfo />
      </n-tab-pane>

      <n-tab-pane name="security" display-directive="show" tab="Security">
        security
      </n-tab-pane>

      <n-tab-pane name="account" display-directive="show" tab="Account">
        account
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
  import AccountSettingTabInfo from './tabs/info.vue'

  const { t } = useAppI18n()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AccountSetting',
  })
</script>
