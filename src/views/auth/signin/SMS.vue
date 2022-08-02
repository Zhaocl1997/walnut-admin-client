<template>
  <div>
    <w-form @hook="register" :model="SMSFormData"> </w-form>

    <WVerify ref="verifyRef" @success="onVerifySuccess" />
  </div>
</template>

<script lang="tsx" setup>
  import type { WButtonInst } from '/@/components/UI/Button'
  import type { WVerifyInst } from '/@/components/Extra/Verify'

  // TODO 99
  import { NRadio, NText, NInput } from 'naive-ui'
  import WButton from '/@/components/UI/Button'

  import {
    AppAuthPrivacyPolicyPath,
    AppAuthServiceAgreementPath,
  } from '/@/router/constant'

  const { t } = useAppI18n()

  const verifyRef = ref<Nullable<WVerifyInst>>(null)
  const verifyButton = ref<Nullable<WButtonInst>>(null)
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

  const onSendCaptcha = async () => {
    const valid = await validate(['phone'])

    if (!valid) return

    verifyRef.value!.onOpenModal()
  }

  const onVerifySuccess = () => {
    nextTick(() => {
      verifyButton.value!.onStartRetry()
    })
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
                <NInput vModel={[formData.captcha, 'value']}></NInput>

                <WButton
                  ref={verifyButton}
                  retry={60}
                  manual-retry
                  text
                  size="small"
                  type="info"
                  class="absolute top-1/2 right-4 -translate-y-1/2"
                  onClick={onSendCaptcha}
                >
                  {t('form:app:signin:sendCaptcha')}
                </WButton>
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
                <NRadio
                  value="agree"
                  checked={formData.agree === 'agree'}
                  size="small"
                ></NRadio>

                <span class="ml-2 text-xs text-gray-500 cursor-pointer break-all">
                  {t('form:app:signin:continue')}
                  <NText
                    type="info"
                    strong
                    onClick={(e: Event) => {
                      e.stopPropagation()
                      openExternalLink(AppAuthServiceAgreementPath)
                    }}
                  >
                    {' '}
                    {t('form:app:signin:sa')}{' '}
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
                    {t('form:app:signin:pp')}{' '}
                  </NText>
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
