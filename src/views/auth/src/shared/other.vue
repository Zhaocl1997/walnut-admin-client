<script lang="ts" setup>
import { useAuthContext } from '../hooks/useAuthContext'
import { getGiteeUri, getGithubUri, getWeiboUri } from '@/api/auth/third'

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

async function onOAuth(getUri: Fn, path: string) {
  loading.value = true

  const res = await getUri()

  childWindow = openOAuthWindow(res)!

  const socketPath = AppSocketEvents.OAUTH(path)

  // use interval to check child window closed or not
  const intervelID = setInterval(() => {
    if (childWindow.closed) {
      loading.value = false

      // remove current socket listener
      AppSocket!.removeListener(socketPath)

      clearInterval(intervelID)
    }
  }, 200)

  AppSocket!.on(socketPath, async (data) => {
    // close the opened window
    childWindow.close()

    useAppMsgSuccess(t('app.oauth.success'))

    await userAuth.ExcuteCoreFnAfterAuth(data.accessToken, data.refreshToken)

    loading.value = false

    // remove current socket listener
    AppSocket!.removeListener(socketPath)
  })
}

async function onClick(key: string) {
  if (['wechat', 'alipay', 'qq'].includes(key)) {
    useAppMessage().warning(t('app.base.wip'))
    return
  }

  if (key === 'github')
    onOAuth(getGithubUri, 'github')

  if (key === 'gitee')
    onOAuth(getGiteeUri, 'gitee')

  if (key === 'weibo')
    onOAuth(getWeiboUri, 'weibo')
}

// parent window closed, child window close as well
useEventListener('beforeunload', () => {
  childWindow?.close()
})
</script>

<template>
  <div>
    <w-transition appear group>
      <n-divider class="text-xs">
        {{ t('app.auth.other') }}
      </n-divider>

      <div class="w-full hstack justify-evenly children:cursor-pointer hover:children:text-primary">
        <span v-for="item in iconArr" :key="item.key" :title="item.title" @click="onClick(item.key)">
          <n-button text :disabled="loading">
            <w-icon :icon="item.icon" width="20" :disabled="loading" />
          </n-button>
        </span>
      </div>
    </w-transition>
  </div>
</template>

<style scoped>
.w-divider {
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}
</style>
