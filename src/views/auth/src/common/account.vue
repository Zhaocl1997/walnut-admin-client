<script lang="tsx" setup>
// TODO 99
import { NButton, NCheckbox } from 'naive-ui'
import { useAuthContext } from '../hooks/useAuthContext'

defineOptions({
  name: 'SignInWithAccount',
  defaultView: false,
})

const { t } = useAppI18n()
const appAuth = useAppStoreUserAuth()
const appNaive = useAppStoreNaive()

const { loading } = useAuthContext()

const accountFormData = reactive<AppPayloadAuth.Password>({
  userName: '',
  password: '',
  rememberMe: true,
})

async function onSubmit() {
  const valid = await validate()

  if (valid) {
    loading.value = true

    try {
      await appAuth.AuthWithBasicPassword(accountFormData)

      loading.value = false

      // close demonstrate notification
      appNaive.destroyAllNotiInst()
    }
    finally {
      loading.value = false
    }
  }
}

function onForgetPassword() {
  useAppMsgSuccess('Forget password')
}

const [register, { validate }] = useForm<typeof accountFormData>({
  localeUniqueKey: 'app.auth',
  baseRules: true,
  showLabel: false,
  xGap: 0,
  disabled: loading,
  schemas: [
    {
      type: 'Base:Input',
      formProp: {
        path: 'userName',
        ruleType: 'string',
      },
      componentProp: {
        clearable: true,
        inputProps: {
          autocomplete: 'username',
        },
      },
      transitionProp: {
        name: 'fade-left-big',
        duration: 500,
      },
    },
    {
      type: 'Extend:Password',
      formProp: {
        path: 'password',
        ruleType: 'string',
      },
      componentProp: {
        onSubmit,
      },
      transitionProp: {
        name: 'fade-left-big',
        duration: 700,
      },
    },
    {
      type: 'Base:Render',
      formProp: {
        showFeedback: false,
      },
      componentProp: {
        render: ({ formData }) => (
          <div class="mb-2 w-full hstack justify-between">
            <NCheckbox vModel={[formData.rememberMe, 'checked']}>
              {t('form.app.auth.remember')}
            </NCheckbox>

            <NButton
              text
              size="small"
              type="tertiary"
              onClick={onForgetPassword}
            >
              {t('form.app.auth.forget')}
            </NButton>
          </div>
        ),
      },
      transitionProp: {
        name: 'fade-left-big',
        duration: 900,
      },
    },
    {
      type: 'Base:Button',
      formProp: {
        showFeedback: false,
      },
      componentProp: {
        textProp: () => (
          <span class="text-lg text-light-800 font-black uppercase">
            {t('app.base.signin')}
          </span>
        ),
        loading,
        disabled: loading,
        class:
          'w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mt-3',
        onClick: onSubmit,
      },
      transitionProp: {
        name: 'fade-left-big',
        duration: 1100,
      },
    },
  ],
})

function setFormData(userName: string, password: string) {
  accountFormData.userName = userName
  accountFormData.password = password
}

onMounted(() => {
  setFormData(appAuth.remember?.userName!, appAuth.remember?.password!)
})

defineExpose({
  setFormData,
})
</script>

<template>
  <w-form :model="accountFormData" @hook="register" />
</template>
