<template>
  <w-form @hook="register" :model="accountFormData"></w-form>
</template>

<script lang="tsx" setup>
  // TODO 99
  import { NCheckbox, NButton } from 'naive-ui'
  import WIcon from '@/components/UI/Icon'

  const { t } = useAppI18n()
  const appAuth = useAppStoreUserAuth()
  const appNaive = useAppStoreNaive()

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

        // close demonstrate notification
        appNaive.destroyCurrentNotiInst()
      }
    }
  }

  const onForgetPassword = () => {
    useAppMsgSuccess('Forget password')
  }

  const onOtherWaySignin = (type: string) => {
    useAppMsgSuccess(type)
  }

  const [register, { validate }] = useForm<typeof accountFormData>({
    localeUniqueKey: 'app.signin',
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
          onSubmit: onSubmit,
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
            <div class="hstack justify-between w-full mb-2">
              <NCheckbox vModel={[formData.rememberMe, 'checked']}>
                {t('form.app.signin.remember')}
              </NCheckbox>

              <NButton
                text
                size="small"
                type="tertiary"
                onClick={onForgetPassword}
              >
                {t('form.app.signin.forget')}
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
            <span class="text-light-800 text-lg font-black uppercase">
              {t('app.base.signin')}
            </span>
          ),
          loading: loading,
          disabled: loading,
          class:
            'w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-2',
          onClick: onSubmit,
        },
        transitionProp: {
          name: 'fade-left-big',
          duration: 1100,
        },
      },
      {
        type: 'Extend:Divider',
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          title: 'app.signin.other',
          titleClass: 'text-xs',
        },
        transitionProp: {
          name: 'fade-left-big',
          duration: 1300,
        },
      },
      {
        type: 'Base:Render',
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          render: () => {
            const iconArr = [
              {
                key: 'wechat',
                icon: 'ant-design:wechat-outlined',
                title: t('app.signin.other.wechat'),
              },
              {
                key: 'alipay',
                icon: 'ant-design:alipay-circle-outlined',
                title: t('app.signin.other.alipay'),
              },
              {
                key: 'qq',
                icon: 'ant-design:qq-outlined',
                title: t('app.signin.other.qq'),
              },
              {
                key: 'weibo',
                icon: 'ant-design:weibo-outlined',
                title: t('app.signin.other.weibo'),
              },
              {
                key: 'github',
                icon: 'ant-design:github-outlined',
                title: t('app.signin.other.github'),
              },
            ]

            return (
              <div class="w-full hstack justify-evenly children:cursor-pointer hover:children:text-primary">
                {iconArr.map((i) => (
                  <span title={i.title} onClick={() => onOtherWaySignin(i.key)}>
                    <WIcon width="20" icon={i.icon}></WIcon>
                  </span>
                ))}
              </div>
            )
          },
        },
        transitionProp: {
          name: 'fade-left-big',
          duration: 1500,
        },
      },
    ],
  })

  const setFormData = (userName: string, password: string) => {
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

<script lang="tsx">
  export default defineComponent({
    name: 'SignInWithAccount',

    defaultView: false,
  })
</script>
