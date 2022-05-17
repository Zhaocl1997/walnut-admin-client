<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <w-form @hook="register" :model="formData"></w-form>
    </n-gi>

    <n-gi>
      <div class="vstack justify-center items-center">
        <Starport v-if="$route.name === 'AccountSetting'" port="w-avatar">
          <WAvatar v-model:value="formData.avatar" :size="240"> </WAvatar>
        </Starport>

        <w-avatar-upload
          v-model:value="formData.avatar"
          ref="avatarUploadRef"
          class="mt-4"
        ></w-avatar-upload>
      </div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
  import WAvatar from '../components/avatar.vue'
  import { userAPI } from '/@/api/system/user'
  import { userActionInfo } from '/@/store/actions/user'

  const { user } = useAppState()
  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  const avatarUploadRef = ref<any>()
  const formData = ref<AppSystemUser>({ ...user.value.userInfo })
  const loading = ref(false)

  const [register] = useForm<typeof formData.value>({
    localeUniqueKey: 'userInfo',
    baseRules: true,
    labelWidth: 120,

    disabled: computed(() => loading.value),

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'userName',
        },
        componentProp: {},
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
          path: 'phoneNumber',
          rule: false,
        },
        componentProp: {},
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'emailAddress',
          rule: false,
        },
        componentProp: {},
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'description',
          rule: false,
        },
        componentProp: {
          type: 'textarea',
        },
      },
      {
        type: 'Extend:Dict',
        formProp: {
          path: 'gender',
          label: true,
          rule: false,
        },
        componentProp: {
          dictType: 'gbt_sex',
          dictRenderType: 'radio',
          renderComponentProps: {
            button: true,
          },
        },
      },
      {
        type: 'Base:Button',
        componentProp: {
          textProp: () => t('form:userInfo:submit'),
          type: 'primary',
          loading: computed(() => loading.value),
          disabled: computed(() => loading.value),
          onClick: async () => {
            loading.value = true

            try {
              // upload avatar and get real avatar url
              await avatarUploadRef.value.onSubmit()
              await userAPI.update(formData.value)
              AppSuccess()
              await userActionInfo()
            } finally {
              loading.value = false
            }
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
