<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <w-form @hook="register" :model="formData"></w-form>
    </n-gi>

    <n-gi>
      <div class="vstack justify-center items-center">
        <Starport v-if="$route.name === 'AccountSetting'" port="w-avatar">
          <WAvatar :size="240"> </WAvatar>
        </Starport>

        <w-avatar-upload
          v-model:value="formData.avatar"
          class="mt-4"
        ></w-avatar-upload>
      </div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
  import WAvatar from '../components/avatar.vue'

  const { user } = useAppState()

  const formData = ref<AppSystemUser>({
    avatar: user.value.userInfo.avatar,
  })

  const [register] = useForm<typeof formData.value>({
    localeUniqueKey: 'userInfo',
    baseRules: true,
    labelWidth: 100,

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'userName',
        },
        componentProp: {
          disabled: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'nickName',
        },
        componentProp: {},
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'description',
        },
        componentProp: {
          type: 'textarea',
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'phoneNumber',
        },
        componentProp: {},
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'emailAddress',
        },
        componentProp: {},
      },
      {
        type: 'Extend:Dict',
        formProp: {
          path: 'gender',
        },
        componentProp: {
          dictType: 'gbt_sex',
          dictRenderType: 'radio',
          renderComponentProps: {
            button: true,
          },
        },
      },
    ],
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAccountSettingsTabInfo',

    defaultView: false,
  })
</script>
