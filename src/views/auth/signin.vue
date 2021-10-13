<template>
  <div @click.stop>
    <w-form
      @hook="register"
      :model="signinFormData"
      class="abs-center w-8/12"
    ></w-form>

    <div class="float-right m-3">
      <WAppLocalePicker></WAppLocalePicker>
    </div>
  </div>
</template>

<script lang="tsx">
  import type { WForm } from '/@/components/UI/Form'

  // import type { WForm } from '/@/components/UI/Form'

  import { useForm } from '/@/components/UI/Form'

  import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
  // import { useForm } from '/@/components/UI/Form'
  import { useI18n } from '/@/locales'
  import { getLocal } from '/@/utils/persistent'
  import { PersistentKeysEnum } from '/@/enums/persistent'
  import { userActionSignin } from '/@/store/actions/user'

  export default defineComponent({
    name: 'SignIn',

    defaultView: false,

    setup() {
      const { t } = useI18n()

      const buttonLoading = ref(false)

      const signinFormData = reactive({
        username: '',
        password: '',
        rememberMe: true,
      })

      const onSignin = async () => {
        const valid = await validate!()
        console.log(valid)

        if (!valid) {
          buttonLoading.value = true

          await userActionSignin(signinFormData)

          buttonLoading.value = false
        }
      }

      const signinFormSchemas = computed(
        (): WForm.Schema.Item<typeof signinFormData>[] => {
          return [
            {
              type: 'Base:Input',
              formProp: {
                path: 'username',
                showRequireMark: false,
                rule: [
                  {
                    required: true,
                    message: t('system.auth.rules.username'),
                    trigger: ['input', 'blur'],
                  },
                ],
              },
              componentProp: {
                placeholder: computed(() => t('system.auth.username')),
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
                    message: t('system.auth.rules.password'),
                    trigger: ['input', 'blur'],
                  },
                ],
              },
              componentProp: {
                placeholder: computed(() => t('system.auth.password')),
                clearable: true,
                type: 'password',
                onKeyup: (e) => {
                  if (e!.code === 'Enter' || e!.code === 'NumpadEnter') {
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
                    {t('system.auth.remember')}
                  </n-checkbox>
                ),
              },
            },
            {
              type: 'Base:Button',
              componentProp: {
                textProp: computed(() => t('system.auth.signin')),
                loading: buttonLoading,
                style: {
                  background: 'transparent',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: '900',
                },
                onClick: onSignin,
              },
            },
          ]
        }
      )

      // const signinFormRules: WForm.ElForm.RuleRecord = {
      //   username: [
      //     {
      //       required: true,
      //       message: t('system.auth.rules.username'),
      //       trigger: 'blur',
      //     },
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       message: t('system.auth.rules.password'),
      //       trigger: 'blur',
      //     },
      //   ],
      // }

      const [register, { validate }] = useForm({
        schemas: signinFormSchemas,
        // rules: signinFormRules,
      })

      onMounted(() => {
        signinFormData.username = getLocal(PersistentKeysEnum.USER_USERNAME)
        signinFormData.password = getLocal(PersistentKeysEnum.USER_PASSWORD)
      })

      return {
        register,
        signinFormData,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
