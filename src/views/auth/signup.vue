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
    confirmPassword: undefined,
  })

  const loading = ref(false)

  const onSubmit = async () => {
    const valid = await validate()

    if (valid) {
      loading.value = true

      try {
        // call api here
        console.log(formData)
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
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'phoneNumber',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'SMSVerificationCode',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'password',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'confirmPassword',
        },
        componentProp: {
          clearable: true,
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
