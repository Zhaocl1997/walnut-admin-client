<template>
  <div>
    <w-form @hook="register" :model="SMSFormData"></w-form>
    <n-modal v-model:show="showVerify">
      <Verify :show="showVerify" :imgs="imgs" @success="onVerifySuccess" />
    </n-modal>
  </div>
</template>

<script lang="tsx" setup>
  import {
    AppAuthPrivacyPolicyPath,
    AppAuthServiceAgreementPath,
  } from '/@/router/constant'
  import { isPhoneNumber } from '/@/utils/regex'
  import Verify from '/@/components/Extra/Verify'

  const { t } = useAppI18n()

  const showVerify = ref(false)
  const loading = ref(false)
  const imgs = [
    'https://isluo.com/kernel/index/img/welcome/girl1.png',
    'https://isluo.com/kernel/index/img/welcome/theback.jpg',
  ]

  const SMSFormData = reactive({
    phone: '',
    captcha: '',
    agree: '',
  })

  const getCanStartCountdown = computed(() => isPhoneNumber(SMSFormData.phone))

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

  const onRetryError = async () => {
    await validate(['phone'])
  }

  const onSendCaptcha = () => {
    console.log('send captcha')
    showVerify.value = true
  }

  const onVerifySuccess = () => {
    console.log(123)
  }

  const [register, { validate }] = useForm<typeof SMSFormData>({
    localeUniqueKey: 'app:signin',
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
                  return Promise.reject(t('form:app:signin:phone:rule'))
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
      },
      {
        type: 'Base:Render',
        formProp: {
          path: 'captcha',
          ruleType: 'string',
        },
        componentProp: {
          render({ formData }) {
            return (
              <div class="relative w-full">
                <n-input vModel={[formData.captcha, 'value']}></n-input>

                <w-button
                  retry={60}
                  text
                  size="small"
                  type="info"
                  can-retry={getCanStartCountdown.value}
                  onRetryError={onRetryError}
                  class="absolute top-1/2 right-4 -translate-y-1/2"
                  onClick={onSendCaptcha}
                >
                  {t('form:app:signin:sendCaptcha')}
                </w-button>
              </div>
            )
          },
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
                <n-radio
                  value="agree"
                  checked={formData.agree === 'agree'}
                  size="small"
                ></n-radio>

                <span class="ml-2 text-xs text-gray-500 cursor-pointer">
                  {t('form:app:signin:continue')}
                  <n-text
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthServiceAgreementPath)
                    }}
                  >
                    {' '}
                    {t('form:app:signin:sa')}{' '}
                  </n-text>
                  、
                  <n-text
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthPrivacyPolicyPath)
                    }}
                  >
                    {' '}
                    {t('form:app:signin:pp')}{' '}
                  </n-text>
                </span>
              </div>
            )
          },
        },
      },
      {
        type: 'Base:Button',
        componentProp: {
          textProp: () => (
            <span class="text-light-800">{t('app:base:signin')}</span>
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
