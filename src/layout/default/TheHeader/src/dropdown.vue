<script lang="tsx" setup>
import type { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'

// TODO 111
import WIcon from '@/components/UI/Icon'

import WAvatar from '@/views/account/settings/components/avatar.vue'
import SwitchRole from './switchRole.vue'

const { t } = useAppI18n()
const userProfile = useAppStoreUserProfile()
const userAuth = useAppStoreUserAuth()

const switchRoleRef = useTemplateRef('switchRoleRef')

const dropdownOptions = computed<DropdownMixedOption[]>(() => [
  {
    key: '1',
    label: t('desc.about.info.doc'),
    icon: () => <WIcon icon="mdi:file-document"></WIcon>,
  },

  {
    key: '2',
    label: t('desc.about.info.code'),
    icon: () => <WIcon icon="ant-design:github-outlined"></WIcon>,
  },

  {
    key: '3',
    label: t('app.base.switchRole'),
    icon: () => <WIcon icon="ant-design:github-outlined"></WIcon>,
    show: userProfile.getCurrentRoleModeIsSwitchable,
  },

  {
    type: 'divider',
  },

  {
    key: '98',
    label: t('app.user.center'),
    icon: () => <WIcon icon="ant-design:profile-outlined"></WIcon>,
  },
  {
    key: '99',
    label: t('app.user.signout'),
    icon: () => <WIcon icon="ant-design:logout-outlined"></WIcon>,
  },
])

async function onSelect(val: string) {
  if (val === '1')
    openExternalLink(__APP_INFO__.urls.doc)

  if (val === '2')
    openExternalLink(__APP_INFO__.urls.github)

  if (val === '3')
    switchRoleRef.value?.onOpen()

  if (val === '98')
    await useAppRouterPush({ name: 'AccountSetting' })

  if (val === '99') {
    const { confirmed } = await useAppConfirm(t('app.user.signout.warning'))

    if (confirmed)
      await userAuth.Signout()
  }
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    size="medium"
    :options="dropdownOptions"
    @select="onSelect"
  >
    <div class="hstack items-center justify-center">
      <div style="height: 32px; width: 32px">
        <WAvatar
          v-if="$route.name !== 'AccountSetting'"
          :size="32"
        />
      </div>

      <div class="my-auto pl-1 text-base font-semibold">
        {{ userProfile.getDisplayName }}
      </div>
    </div>
  </n-dropdown>

  <SwitchRole ref="switchRoleRef" />
</template>
