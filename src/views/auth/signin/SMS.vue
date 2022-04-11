<template>
  <w-form @hook="register" :model="textingFormData"></w-form>
</template>

<script lang="tsx" setup>
  import { isPhoneNumber } from '/@/utils/regex'

  const { t } = useAppI18n()

  const loading = ref(false)

  const textingFormData = reactive({
    phone: '',
    captcha: '',
  })

  const getCanStartCountdown = computed(() =>
    isPhoneNumber(textingFormData.phone)
  )

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        console.log(textingFormData)
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
  }

  const [register, { validate }] = useForm<typeof textingFormData>({
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
                  return Promise.reject('请输入正确的手机号码')
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
                  class="w-auto absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2"
                  text-class="-ml-2"
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
        type: 'Base:Button',
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
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'SignInWithSMS',

    defaultView: false,
  })
</script>
