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
          <w-icon :icon="item.icon" width="20"></w-icon>
        </span>
      </div>
    </w-transition>
  </div>
</template>

<script lang="ts" setup>
  const { t } = useAppI18n()

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
  ])

  const onClick = (key: string) => {
    useAppMsgSuccess(key)
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
