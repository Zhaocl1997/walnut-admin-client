<template>
  <n-dropdown trigger="hover" @select="onSelect" :options="dropdownOptions">
    <div class="hstack">
      <n-avatar
        src="/assets/logo.png"
        circle
        alt="avatar"
        size="small"
      ></n-avatar>

      <div class="text-base font-semibold pl-1 my-auto">
        {{ getUserName }}
      </div>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
  import { upperFirst } from 'easy-fns-ts'
  import { userActionSignOut } from '/@/store/actions/user'

  const { t } = useAppI18n()
  const { user } = useAppState()

  const { goNext } = useContinue(() => t('app:user:signout:warning'))

  const dropdownOptions = computed(() => [
    {
      key: '1',
      label: t('app:user:signout'),
    },
  ])

  const getUserName = computed(() => upperFirst(user.value.userInfo?.username!))

  const onSelect = async (val: string) => {
    if (val === '1') {
      const res = await goNext()

      if (res) {
        userActionSignOut()
      }
    }
  }
</script>
