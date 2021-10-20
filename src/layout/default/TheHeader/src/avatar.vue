<template>
  <n-dropdown trigger="hover" @select="onSelect" :options="dropdownOptions">
    <div class="*hstack">
      <n-avatar
        src="https://img0.baidu.com/it/u=1616913770,1917139498&fm=26&fmt=auto&gp=0.jpg"
        circle
        alt="avatar"
        size="small"
      ></n-avatar>

      <div class="app-text text-base font-semibold pl-1 my-auto">
        {{ getUserName }}
      </div>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
  import { upperFirst } from 'easy-fns-ts'
  import { userActionSignOut } from '/@/store/actions/user'

  const { user } = useAppContext()

  const { goNext } = useContinue('Are you sure to sign out?')

  const dropdownOptions = ref([
    {
      key: '1',
      label: 'Sign Out',
    },
  ])

  const getUserName = computed(() => upperFirst(user.value.userInfo.username!))

  const onSelect = async (val: string) => {
    if (val === '1') {
      const res = await goNext()

      if (res) {
        userActionSignOut()
      }
    }
  }
</script>
