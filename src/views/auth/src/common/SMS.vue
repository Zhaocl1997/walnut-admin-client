<script lang="tsx" setup>
import type { PhoneNumberInputUpdateParams } from '@/components/Extra/PhoneNumberInput'
import { sendAuthTextMsg } from '@/api/auth/phone'
// TODO 99
import { NRadio, NText } from 'naive-ui'
import { useAuthContext } from '../hooks/useAuthContext'

defineOptions({
  name: 'SignInWithSMS',
  defaultView: false,
})

const { t } = useAppI18n()
const appAuth = useAppStoreUserAuth()
const appNaive = useAppStoreNaive()

const { loading } = useAuthContext()

const countryCallingCode = ref()
const SMSFormData = reactive<AppPayloadAuth.PhoneNumber & { agree: string }>({
  phoneNumber: '',
  verifyCode: '',
  agree: '',
})

async function onSubmit() {
  const valid = await validate()

  if (valid) {
    loading.value = true

    try {
      await appAuth.AuthWithPhoneNumber(SMSFormData)

      loading.value = false

      // close demonstrate notification
      appNaive.destroyCurrentNotiInst()
    }
    finally {
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
      type: 'Extra:PhoneNumberInput',
      formProp: {
        path: 'phoneNumber',
        locale: false,
        first: true,
        label: computed(() => t('app.base.phoneNumber')),
        rule: [
          {
            key: 'phoneNumber',
            type: 'string',
            trigger: ['change'],
            validator: (rule, value) => {
              // to call base rule
              if (!value)
                return Promise.resolve()

              if (!isPhoneNumber(`+${countryCallingCode.value}${value}`))
                return Promise.reject(t('app.base.phoneNumber.rule'))

              return Promise.resolve()
            },
          },
        ],
      },
      componentProp: {
        preferred: true,
        example: true,
        autoDefaultCountry: true,
        onUpdate: (val: PhoneNumberInputUpdateParams) => {
          countryCallingCode.value = val.countryCallingCode
        },
      },
      transitionProp: {
        name: 'fade-down-big',
        duration: 500,
      },
    },
    {
      type: 'Extra:SMSInput',
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

          if (!valid || !SMSFormData.phoneNumber)
            return false

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
                (SMSFormData.agree = SMSFormData.agree ? '' : 'agree')}
            >
              <NRadio
                value="agree"
                checked={formData.agree === 'agree'}
                size="small"
              >
              </NRadio>

              <span class="ml-2 cursor-pointer break-all text-xs text-gray-500">
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
                  {t('form.app.auth.sa')}
                  {' '}
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
                  {t('form.app.auth.pp')}
                  {' '}
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
            {t('app.base.signin')}
            {' '}
            /
            {t('app.base.signup')}
          </span>
        ),
        loading,
        disabled: computed(
          () => (SMSFormData.agree as unknown as boolean) && loading.value,
        ),
        style: {
          width: '100%',
          fontSize: '18px',
          fontWeight: '900',
        },
        class:
            'm-auto uppercase rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 -mt-2',
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

<template>
  <w-form :model="SMSFormData" @hook="register" />
</template>
