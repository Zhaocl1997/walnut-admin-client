<template>
  <w-form
    class="w-72 text-justify mt-2"
    @hook="register"
    :model="formData"
  ></w-form>
</template>

<script lang="ts" setup>
  const formData = ref({
    userName: undefined,
    phoneNumber: undefined,
    SMSVerificationCode: undefined,
    password: undefined,
  })

  const loading = ref(false)

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
    localeUniqueKey: 'app:signup',
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
      },
      {
        type: 'Extend:Password',
        formProp: {
          path: 'password',
          ruleType: 'string',
        },
        componentProp: {
          confirm: true,
        },
      },
      {
        type: 'Base:Button',
        formProp: {
          showFeedback: false,
        },
        componentProp: {
          textProp: 'Submit Button',
          loading: loading,
          disabled: loading,
          onClick: onSubmit,
        },
      },
    ],
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'SignUp',

    defaultView: false,
  })
</script>
