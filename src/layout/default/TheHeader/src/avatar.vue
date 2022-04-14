<template>
  <n-dropdown
    trigger="hover"
    size="medium"
    @select="onSelect"
    :options="dropdownOptions"
  >
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

<script lang="tsx" setup>
  import type { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'
  import { upperFirst } from 'easy-fns-ts'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'

  import { userActionSignOut } from '/@/store/actions/user'

  const { t } = useAppI18n()
  const { user } = useAppState()

  const { goNext } = useContinue(() => t('app:user:signout:warning'))

  const dropdownOptions = computed<DropdownMixedOption[]>(() => [
    {
      key: '1',
      label: t('desc:about:info:doc'),
      icon: () => <WIcon icon="mdi:file-document"></WIcon>,
    },

    {
      type: 'divider',
    },
    {
      key: '2',
      label: t('app:user:center'),
      icon: () => <WIcon icon="ant-design:profile-outlined"></WIcon>,
    },
    {
      key: '99',
      label: t('app:user:signout'),
      icon: () => <WIcon icon="ant-design:logout-outlined"></WIcon>,
    },
  ])

  // TODO
  const getUserName = computed(() =>
    upperFirst(user.value.userInfo?.username! || '')
  )

  const onSelect = async (val: string) => {
    if (val === '1') {
      openExternalLink('https://walnut-admin-doc.netlify.app/')
    }

    if (val === '99') {
      const res = await goNext()

      if (res) {
        userActionSignOut()
      }
    }
  }
</script>
