<template>
  <w-form @hook="register" :model="SMSFormData"> </w-form>
</template>

<script lang="tsx" setup>
  // TODO 99
  import { sendAuthTextMsg } from '@/api/auth/phone'
  import { NRadio, NText } from 'naive-ui'

  const { t } = useAppI18n()
  const appAuth = useAppStoreUserAuth()
  const appNaive = useAppStoreNaive()

  const loading = ref(false)

  const SMSFormData = reactive<AppAuth.PhoneNumber & { agree: string }>({
    phoneNumber: '',
    verifyCode: '',
    agree: '',
  })

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        await appAuth.AuthWithPhoneNumber(SMSFormData)

        // close demonstrate notification
        appNaive.destroyCurrentNotiInst()
      } finally {
        loading.value = false
      }
    }
  }

  const [register, { validate }] = useForm<typeof SMSFormData>({
    localeUniqueKey: 'app.auth',
    baseRules: true,
    showLabel: false,
    xGap: 0,
    disabled: loading,
    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'phoneNumber',
          ruleType: 'string',
          first: true,
          locale: false,
          label: computed(() => t('app.base.phoneNumber')),
          rule: [
            {
              key: 'phoneNumber',
              type: 'string',
              trigger: ['input', 'change'],
              validator: (rule, value) => {
                // to call base rule
                if (!value) return Promise.resolve()

                if (!isPhoneNumber(value)) {
                  return Promise.reject(t('app.base.phoneNumber.rule'))
                }

                return Promise.resolve()
              },
            },
          ],
        },
        componentProp: {
          clearable: true,
          inputProps: {
            autocomplete: 'phoneNumber',
          },
        },
        transitionProp: {
          name: 'fade-down-big',
          duration: 500,
        },
      },
      {
        type: 'Extend:SMSInput',
        formProp: {
          path: 'verifyCode',
          ruleType: 'string',
          label: computed(() => t('app.base.verifyCode')),
          locale: false,
        },
        componentProp: {
          clearable: true,

          onBeforeCountdown: async () => {
            // valid phoneNumber before count down
            const valid = await validate(['phoneNumber'])

            if (!valid) return false

            return true
          },

          onSuccess: async (startCountdown) => {
            // here to call phone number text message endpoint
            await sendAuthTextMsg(SMSFormData)

            useAppMsgSuccess()

            startCountdown()
          },

          // use simple canvas verify, no endpopint support
          simpleVerify: true,
        },
        transitionProp: {
          name: 'fade-down-big',
          duration: 700,
        },
      },
      {
        type: 'Base:Render',
        formProp: {
          path: 'agree',
          rule: false,
        },
        componentProp: {
          render({ formData }) {
            return (
              <div
                onClick={() =>
                  (SMSFormData.agree = SMSFormData.agree ? '' : 'agree')
                }
              >
                <NRadio
                  value="agree"
                  checked={formData.agree === 'agree'}
                  size="small"
                ></NRadio>

                <span class="ml-2 text-xs text-gray-500 cursor-pointer break-all">
                  {t('form.app.auth.continue')}
                  <NText
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthServiceAgreementPath)
                    }}
                  >
                    {' '}
                    {t('form.app.auth.sa')}{' '}
                  </NText>
                  、
                  <NText
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthPrivacyPolicyPath)
                    }}
                  >
                    {' '}
                    {t('form.app.auth.pp')}{' '}
                  </NText>
                </span>
              </div>
            )
          },
        },
        transitionProp: {
          name: 'fade-down-big',
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
            <span class="text-light-800">
              {t('app.base.signin')} / {t('app.base.signup')}
            </span>
          ),
          loading: loading,
          disabled: computed(
            () => (SMSFormData.agree as unknown as boolean) && loading.value
          ),
          style: {
            width: '100%',
            fontSize: '18px',
            fontWeight: '900',
          },
          class:
            'm-auto uppercase rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-2',
          onClick: onSubmit,
        },
        transitionProp: {
          name: 'fade-down-big',
          duration: 1100,
        },
      },
    ],
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'SignInWithSMS',

    defaultView: false,
  })
</script>
