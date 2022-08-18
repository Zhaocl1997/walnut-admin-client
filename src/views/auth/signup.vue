<template>
  <w-form
    class="w-72 text-justify mt-2"
    @hook="register"
    :model="formData"
  ></w-form>
</template>

<script lang="tsx" setup>
  const formData = ref({
    userName: undefined,
    phoneNumber: undefined,
    SMSVerificationCode: undefined,
    password: undefined,
    passwordConfirm: undefined,
  })

  const loading = ref(false)

  const { t } = useAppI18n()

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        // call api here
        console.log(formData.value)
      } finally {
        loading.value = false
      }
    }
  }

  const [register, { validate }] = useForm<typeof formData>({
    localeUniqueKey: 'app.signup',
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
        },
        transitionProp: {
          name: 'fade-up-big',
          duration: 500,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'phoneNumber',
          ruleType: 'string',
        },
        componentProp: {
          clearable: true,
        },
        transitionProp: {
          name: 'fade-up-big',
          duration: 700,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'SMSVerificationCode',
          ruleType: 'string',
        },
        componentProp: {
          clearable: true,
        },
        transitionProp: {
          name: 'fade-up-big',
          duration: 900,
        },
      },
      {
        type: 'Extend:Password',
        formProp: {
          path: 'password',
          ruleType: 'string',
        },
        componentProp: {},
        transitionProp: {
          name: 'fade-up-big',
          duration: 1100,
        },
      },
      {
        type: 'Extend:Password',
        formProp: {
          path: 'passwordConfirm',
          ruleType: 'string',
        },
        componentProp: {},
        transitionProp: {
          name: 'fade-up-big',
          duration: 1300,
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
              {t('app.base.signup')}
            </span>
          ),
          loading: loading,
          disabled: loading,
          class:
            'w-full uppercase rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-2',
          onClick: onSubmit,
        },
        transitionProp: {
          name: 'fade-up-big',
          duration: 1500,
        },
      },
    ],
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'SignUp',

    defaultView: false,
  })
</script>
