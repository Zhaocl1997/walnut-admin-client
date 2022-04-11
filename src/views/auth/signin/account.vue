<template>
  <w-form @hook="register" :model="accountFormData"></w-form>
</template>

<script lang="tsx" setup>
  import { userActionSignin } from '/@/store/actions/user'

  const { t } = useAppI18n()
  const { auth } = useAppState()

  const loading = ref(false)

  const accountFormData = reactive({
    username: '',
    password: '',
    rememberMe: true,
  })

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        await userActionSignin(accountFormData)
      } finally {
        loading.value = false
      }
    }
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
          path: 'username',
          ruleType: 'string',
        },
        componentProp: {
          clearable: true,
          inputProps: {
            autocomplete: 'username',
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
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          render: ({ formData }) => (
            <n-checkbox vModel={[formData.rememberMe, 'checked']}>
              {t('form:app:signin:remember')}
            </n-checkbox>
          ),
        },
      },
      {
        type: 'Base:Button',
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          textProp: computed(() => t('app:base:signin')),
          loading: loading,
          disabled: loading,
          style: {
            width: '100%',
            fontSize: '18px',
            fontWeight: '900',
          },
          class: 'm-auto uppercase rounded-full',
          onClick: onSubmit,
        },
      },
    ],
  })

  onMounted(() => {
    accountFormData.username = auth.value.username!
    accountFormData.password = auth.value.password!
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'SignInWithAccount',

    defaultView: false,
  })
</script>
