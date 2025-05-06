<script lang="ts" setup>
import type { WAvatarUploadInst } from '@/components/Business/AvatarUpload'
import { userAPI } from '@/api/system/user'
import { pick } from 'lodash-es'
import WAvatar from '../components/avatar.vue'

defineOptions({
  name: 'WAccountSettingsTabInfo',
  defaultView: false,
})

const { t } = useAppI18n()
const userProfile = useAppStoreUserProfile()

const avatarUploadRef = ref<WAvatarUploadInst>()
const formData = ref<AppSystemUser>({
  ...pick(userProfile.profile, [
    '_id',
    'userName',
    'nickName',
    'phoneNumber',
    'emailAddress',
    'description',
    'gender',
    'avatar',
  ]),
})

const loading = ref(false)
const tempSrcUrl = ref<string>()

function onAvatarChange(temp: string) {
  tempSrcUrl.value = temp
}

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
      type: 'Business:Dict',
      formProp: {
        path: 'gender',
        label: true,
        rule: false,
      },
      componentProp: {
        dictType: 'gbt_sex',
        renderType: 'radio',
        componentProps: {
          button: true,
        },
      },
    },
    {
      type: 'Base:Button',
      componentProp: {
        textProp: () => t('form.userInfo.submit'),
        type: 'primary',
        loading: computed(() => loading.value),
        disabled: computed(() => loading.value),
        onClick: async () => {
          loading.value = true

          try {
            // TODO upload refactor
            // upload avatar and get real avatar url
            const isAvatarUploadSuccess
                = await avatarUploadRef.value?.onOSSUpload()

            if (!isAvatarUploadSuccess)
              return

            // set the new avatar url
            formData.value.avatar = tempSrcUrl.value

            await userAPI.update(formData.value)
            useAppMsgSuccess()
            await userProfile.getProfile()
          }
          finally {
            loading.value = false
          }
        },
      },
    },
  ],
})
</script>

<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <w-form :model="formData" @hook="register" />
    </n-gi>

    <n-gi>
      <div class="vstack items-center justify-center">
        <Starport
          v-if="$route.name === 'AccountSetting'"
          port="w-avatar"
          style="height: 240px; width: 240px"
        >
          <WAvatar :value="tempSrcUrl ?? formData.avatar" :size="240" />
        </Starport>

        <w-avatar-upload
          ref="avatarUploadRef"
          class="mt-4"
          @change="onAvatarChange"
        />
      </div>
    </n-gi>
  </n-grid>
</template>
