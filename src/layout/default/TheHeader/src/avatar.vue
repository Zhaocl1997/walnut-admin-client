<template>
  <w-dropdown
    :options="userDropdown"
    @command="onCommand"
    size="medium"
    trigger="click"
  >
    <div class="flex flex-nowrap flex-row">
      <div class="select-none">
        <el-avatar
          src="https://www.mcmod.cn/pages/class/images/cover/20170621/1498029956_9203_KvIr.jpg"
          fit="cover"
          alt="avatar"
          size="small"
        ></el-avatar>
      </div>

      <div class="font-sans text-base text-primary font-semibold pl-1 my-auto">
        {{ getUserName }}
      </div>
    </div>
  </w-dropdown>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive } from 'vue'
  import { upperFirst } from 'easy-fns-ts'
  import { ElMessageBox } from 'element-plus'

  import { useAppStore } from '/@/store'

  export default defineComponent({
    name: 'HeaderAvatar',

    setup() {
      const { getters, dispatch } = useAppStore()

      const userDropdown = reactive([
        {
          value: '1',
          label: 'Sign Out',
        },
      ])

      const getUserName = computed(() => upperFirst(getters.userInfo.username))

      const onCommand = async (val: string) => {
        switch (val) {
          case '1':
            {
              const res = await ElMessageBox.confirm(
                'Are you sure to sign out?',
                'Warning'
              )

              if (res === 'confirm') {
                dispatch('user/SignOut')
              }
            }
            break

          default:
            break
        }
      }

      return {
        userDropdown,
        getUserName,
        onCommand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
