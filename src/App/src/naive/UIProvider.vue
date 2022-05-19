<template>
  <n-config-provider
    :hljs="hljs"
    :theme="getTheme"
    :theme-overrides="getThemeOverrides"
    :locale="getLocale"
    :date-locale="getDateLocale"
    inline-theme-disabled
    cls-prefix="w"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider :max="3" :placement="appMsg.notiPlacement">
          <n-message-provider :max="5" :placement="appMsg.msgPlacement">
            <slot />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  // notice that `cls-preifx` is not recommended to change
  // the reason is that there are some class-selectors which starts with `.w-` influence the style
  import { hljs } from './src/hljs'
  import { getLocale, getDateLocale } from './src/locale'
  import { getTheme, getThemeOverrides } from './src/theme'

  const appMsg = useAppMsgStore()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'UIProvider',
  })
</script>
