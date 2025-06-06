<script lang="ts" setup>
import { getGiteeURIAPI, getGitHubURIAPI, getWeiboURIAPI } from '@/api/auth/third'
import { useAuthContext } from '../hooks/useAuthContext'

defineOptions({
  name: 'SharedOtherWayToSignin',
  defaultView: false,
})

const { t } = useAppI18n()
const userAuth = useAppStoreUserAuth()
const appAuthSettings = useAppStoreSettingBackend()
const { loading } = useAuthContext()

let childWindow: Window

const iconArr = computed(() =>
  [
    {
      key: 'wechat',
      icon: 'ant-design:wechat-outlined',
      title: t('app.auth.other.wechat'),
      show: appAuthSettings.getWechatEnabled,
    },
    {
      key: 'alipay',
      icon: 'ant-design:alipay-circle-outlined',
      title: t('app.auth.other.alipay'),
      show: appAuthSettings.getAliPayEnabled,
    },
    {
      key: 'qq',
      icon: 'ant-design:qq-outlined',
      title: t('app.auth.other.qq'),
      show: appAuthSettings.getQQEnabled,
    },
    {
      key: 'weibo',
      icon: 'ant-design:weibo-outlined',
      title: t('app.auth.other.weibo'),
      show: appAuthSettings.getWeiboEnabled,
    },
    {
      key: 'github',
      icon: 'ant-design:github-outlined',
      title: t('app.auth.other.github'),
      show: appAuthSettings.getGitHubEnabled,
    },
    {
      key: 'gitee',
      icon: 'simple-icons:gitee',
      title: t('app.auth.other.gitee'),
      show: appAuthSettings.getGiteeEnabled,
    },
  ].filter(i => i.show ?? true),
)

async function onOAuth(type: string) {
  loading.value = true

  const api = {
    gitee: getGiteeURIAPI,
    github: getGitHubURIAPI,
    weibo: getWeiboURIAPI,
  }

  // @ts-expect-error any index
  const res = await api[type]()

  childWindow = openOAuthWindow(res)!

  const socketPath = AppSocketEvents.OAUTH()

  // use interval to check child window closed or not
  const intervelID = setInterval(() => {
    if (childWindow.closed) {
      loading.value = false

      // remove current socket listener
      AppSocket().removeListener(socketPath)

      clearInterval(intervelID)
    }
  }, 200)

  AppSocket().on(socketPath, async (data) => {
    // close the opened window
    childWindow.close()

    // oauth success
    if (data.success) {
      useAppMsgSuccess(t('app.oauth.success'))

      await userAuth.ExcuteCoreFnAfterAuth(data.tokens.accessToken, data.tokens.refreshToken)
    }

    loading.value = false

    // remove current socket listener
    AppSocket().removeListener(socketPath)
  })
}

async function onClick(key: string) {
  if (['wechat', 'alipay', 'qq'].includes(key)) {
    useAppMessage().warning(t('app.base.wip'))
    return
  }

  onOAuth(key)
}

// parent window closed, child window close as well
useEventListener('beforeunload', () => {
  childWindow?.close()
})
</script>

<template>
  <div>
    <WTransition appear group>
      <n-divider class="text-xs">
        {{ t('app.auth.other') }}
      </n-divider>

      <div class="w-full hstack justify-evenly children:cursor-pointer hover:children:text-primary">
        <WIconButton
          v-for="item in iconArr"
          :key="item.key"
          :button-props="{ text: true, disabled: loading, onClick: () => onClick(item.key), title: item.title }"
          :icon-props="{ icon: item.icon, width: '20' }"
        />
      </div>
    </WTransition>
  </div>
</template>

<style scoped>
.w-divider {
  margin: 12px 0 !important;
}
</style>
