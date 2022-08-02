<template>
  <w-form @hook="register" :model="accountFormData"></w-form>
</template>

<script lang="tsx" setup>
  // TODO 99
  import { NCheckbox, NButton } from 'naive-ui'

  const { t } = useAppI18n()
  const appAuth = useAppStoreUserAuth()

  const loading = ref(false)

  const accountFormData = reactive({
    userName: '',
    password: '',
    rememberMe: true,
  })

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        await appAuth.SignInWithPassword(accountFormData)
      } finally {
        loading.value = false
      }
    }
  }

  const onForgetPassword = () => {
    console.log('forget password')
  }

  const [register, { validate }] = useForm<typeof accountFormData>({
    localeUniqueKey: 'app:signin',
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
            autocomplete: 'userName',
          },
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'password',
          ruleType: 'string',
        },
        componentProp: {
          clearable: true,
          type: 'password',
          showPasswordOn: 'click',
          onKeyup: (e) => {
            if (e.code === 'Enter' || e.code === 'NumpadEnter') {
              onSubmit()
            }
          },
          inputProps: {
            autocomplete: 'current-password',
          },
        },
      },
      {
        type: 'Base:Render',
        componentProp: {
          render: ({ formData }) => (
            <div class="hstack justify-between w-full">
              <NCheckbox vModel={[formData.rememberMe, 'checked']}>
                {t('form:app:signin:remember')}
              </NCheckbox>

              <NButton
                text
                size="small"
                type="tertiary"
                onClick={onForgetPassword}
              >
                {t('form:app:signin:forget')}
              </NButton>
            </div>
          ),
        },
      },
      {
        type: 'Base:Button',
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          textProp: () => (
            <span class="text-light-800">{t('app:base:signin')}</span>
          ),
          loading: loading,
          disabled: loading,
          style: {
            width: '100%',
            fontSize: '18px',
            fontWeight: '900',
          },
          class:
            'm-auto uppercase rounded-full bg-gradient-to-r from-cyan-500 to-blue-500',
          onClick: onSubmit,
        },
      },
    ],
  })

  onMounted(() => {
    accountFormData.userName = appAuth.remember?.userName!
    accountFormData.password = appAuth.remember?.password!
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'SignInWithAccount',

    defaultView: false,
  })
</script>
