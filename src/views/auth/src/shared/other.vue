<template>
  <div>
    <w-transition appear group>
      <n-divider class="text-xs">{{ t('app.auth.other') }}</n-divider>

      <div
        class="w-full hstack justify-evenly children:cursor-pointer hover:children:text-primary"
      >
        <span
          v-for="item in iconArr"
          :key="item.key"
          :title="item.title"
          @click="onClick(item.key)"
        >
          <n-button text :disabled="loading">
            <w-icon :icon="item.icon" width="20" :disabled="loading"></w-icon>
          </n-button>
        </span>
      </div>
    </w-transition>
  </div>
</template>

<script lang="ts" setup>
  import { getGithubUri, getGiteeUri } from '@/api/auth/third'
  import { delFP } from '@/api/auth/fingerprint'
  import { fpId } from '@/hooks/web/useFingerprint'
  import { useAuthContext } from '../hooks/useAuthContext'

  const { t } = useAppI18n()
  const userAuth = useAppStoreUserAuth()
  const { loading } = useAuthContext()

  const iconArr = computed(() => [
    {
      key: 'wechat',
      icon: 'ant-design:wechat-outlined',
      title: t('app.auth.other.wechat'),
    },
    {
      key: 'alipay',
      icon: 'ant-design:alipay-circle-outlined',
      title: t('app.auth.other.alipay'),
    },
    {
      key: 'qq',
      icon: 'ant-design:qq-outlined',
      title: t('app.auth.other.qq'),
    },
    {
      key: 'weibo',
      icon: 'ant-design:weibo-outlined',
      title: t('app.auth.other.weibo'),
    },
    {
      key: 'github',
      icon: 'ant-design:github-outlined',
      title: t('app.auth.other.github'),
    },
    {
      key: 'gitee',
      icon: 'simple-icons:gitee',
      title: t('app.auth.other.github'),
    },
  ])

  const onOAuth = async (getUri: Fn, ssePath: string) => {
    loading.value = true

    const res = await getUri()

    const child = openOAuthWindow(res)

    const eventSource = new EventSource(
      `${realAPIURL}/auth/third/${ssePath}/check/${fpId.value}`
    )

    eventSource.onmessage = async ({ data }) => {
      const res = JSON.parse(data)

      if (res?.accessToken) {
        useAppMsgSuccess(t('app.oauth.success'))
        eventSource.close()
        await userAuth.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)
        await delFP()
        loading.value = false
      }
    }

    const { pause } = useIntervalFn(() => {
      if (child?.closed) {
        pause()
        loading.value = false
        setTimeout(() => {
          eventSource.close()
        }, 1500)
      }
    })
  }

  const onClick = async (key: string) => {
    if (!['github', 'gitee'].includes(key)) {
      useAppMessage().warning(t('app.base.wip'))
      return
    }

    if (key === 'github') {
      onOAuth(getGithubUri, 'github')
    }

    if (key === 'gitee') {
      onOAuth(getGiteeUri, 'gitee')
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'SharedOtherWayToSignin',

    defaultView: false,
  })
</script>

<style scoped>
  .w-divider {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
</style>
