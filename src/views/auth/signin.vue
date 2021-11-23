<template>
  <w-form @hook="register" :model="signinFormData"></w-form>
</template>

<script lang="tsx">
  import { userActionSignin } from '/@/store/actions/user'

  export default defineComponent({
    name: 'SignIn',

    defaultView: false,

    setup() {
      const { t } = useAppI18n()
      const { auth } = useAppState()

      const loading = ref(false)

      const signinFormData = reactive({
        username: '',
        password: '',
        rememberMe: true,
      })

      const onSignin = async () => {
        const valid = await validate!()

        if (valid) {
          loading.value = true

          try {
            await userActionSignin(signinFormData)
          } finally {
            loading.value = false
          }
        }
      }

      const [register, { validate }] = useForm<typeof signinFormData>({
        showLabel: false,
        xGap: 0,
        disabled: loading,
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'username',
              showRequireMark: false,
              rule: [
                {
                  required: true,
                  message: t('form:signin:username:rule'),
                  trigger: ['input', 'blur'],
                },
              ],
            },
            componentProp: {
              placeholder: computed(() => t('form:signin:username')),
              clearable: true,
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              path: 'password',
              showRequireMark: false,
              rule: [
                {
                  required: true,
                  message: t('form:signin:password:rule'),
                  trigger: ['input', 'blur'],
                },
              ],
            },
            componentProp: {
              placeholder: computed(() => t('form:signin:password')),
              clearable: true,
              type: 'password',
              showPasswordOn: 'click',
              onKeyup: (e) => {
                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                  onSignin()
                }
              },
            },
          },
          {
            type: 'Base:Render',
            componentProp: {
              render: ({ formData }) => (
                <n-checkbox vModel={[formData.rememberMe, 'checked']}>
                  {t('form:signin:remember')}
                </n-checkbox>
              ),
            },
          },
          {
            type: 'Base:Button',
            componentProp: {
              textProp: computed(() => t('form:signin:submit')),
              loading: loading,
              disabled: loading,
              style: {
                background: 'transparent',
                width: '100%',
                fontSize: '18px',
                fontWeight: '900',
              },
              class: 'm-auto uppercase rounded-full',
              onClick: onSignin,
            },
          },
        ],
      })

      onMounted(() => {
        signinFormData.username = auth.value.username!
        signinFormData.password = auth.value.password!
      })

      return {
        register,
        signinFormData,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
