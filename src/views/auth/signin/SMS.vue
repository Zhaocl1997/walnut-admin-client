<template>
  <w-form @hook="register" :model="SMSFormData"> </w-form>
</template>

<script lang="tsx" setup>
  // TODO 99
  import { NRadio, NText } from 'naive-ui'

  const { t } = useAppI18n()

  const loading = ref(false)

  const SMSFormData = reactive({
    phone: '',
    captcha: '',
    agree: '',
  })

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        console.log(SMSFormData)
      } finally {
        setTimeout(() => {
          loading.value = false
        }, 1500)
      }
    }
  }

  const [register, { validate }] = useForm<typeof SMSFormData>({
    localeUniqueKey: 'app.signin',
    baseRules: true,
    showLabel: false,
    xGap: 0,
    disabled: loading,
    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'phone',
          ruleType: 'string',
          first: true,
          rule: [
            {
              key: 'phone',
              type: 'string',
              trigger: ['input', 'change'],
              validator: (rule, value) => {
                // to call base rule
                if (!value) return Promise.resolve()

                if (!isPhoneNumber(value)) {
                  return Promise.reject(t('form.app.signin.phone.rule'))
                }
                return Promise.resolve()
              },
            },
          ],
        },
        componentProp: {
          clearable: true,
          inputProps: {
            autocomplete: 'phone',
          },
        },
        transitionProp: {
          name: 'fade-right-big',
          duration: 500,
        },
      },
      {
        type: 'Extend:SMSInput',
        formProp: {
          path: 'captcha',
          ruleType: 'string',
        },
        componentProp: {
          onBeforeCountdown: async () => {
            // valid phone before count down
            const valid = await validate(['phone'])

            if (!valid) return false

            return true
          },

          onSuccess: async (startCountdown) => {
            // here to call SMS endpoint
            setTimeout(() => {
              useAppMsgSuccess('Send Success')
              startCountdown()
            }, 1500)
          },

          // use simple canvas verify, no endpopint support
          simpleVerify: true,
        },
        transitionProp: {
          name: 'fade-right-big',
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
                  {t('form.app.signin.continue')}
                  <NText
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthServiceAgreementPath)
                    }}
                  >
                    {' '}
                    {t('form.app.signin.sa')}{' '}
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
                    {t('form.app.signin.pp')}{' '}
                  </NText>
                </span>
              </div>
            )
          },
        },
        transitionProp: {
          name: 'fade-right-big',
          duration: 900,
        },
      },
      {
        type: 'Base:Button',
        componentProp: {
          textProp: () => (
            <span class="text-light-800">{t('app.base.signin')}</span>
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
            'm-auto uppercase rounded-full bg-gradient-to-r from-cyan-500 to-blue-500',
          onClick: onSubmit,
        },
        transitionProp: {
          name: 'fade-right-big',
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
