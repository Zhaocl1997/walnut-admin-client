<template>
  <n-dropdown trigger="hover" @select="onSelect" :options="userDropdown">
    <div class="flex flex-nowrap flex-row">
      <n-avatar
        src="https://img0.baidu.com/it/u=1616913770,1917139498&fm=26&fmt=auto&gp=0.jpg"
        circle
        alt="avatar"
        size="small"
      ></n-avatar>

      <div class="font-sans text-base font-semibold pl-1 my-auto">
        {{ getUserName }}
      </div>
    </div>
  </n-dropdown>
</template>

<script lang="ts">
  import { upperFirst } from 'easy-fns-ts'

  import { userActionSignOut } from '/@/store/actions/user'

  export default defineComponent({
    name: 'HeaderAvatar',

    setup() {
      const { user } = useAppContext()

      const { goNext } = useContinue('Are you sure to sign out?')

      const userDropdown = reactive([
        {
          key: '1',
          label: 'Sign Out',
        },
      ])

      const getUserName = computed(() =>
        upperFirst(user.value.userInfo.username!)
      )

      const onSelect = async (val: string) => {
        if (val === '1') {
          const res = await goNext()

          if (res) {
            userActionSignOut()
          }
        }
      }

      return {
        userDropdown,
        getUserName,
        onSelect,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
