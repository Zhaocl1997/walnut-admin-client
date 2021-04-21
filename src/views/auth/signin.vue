<template>
  <div @click.stop>
    <w-form
      v-model="signinFormData"
      class="abs-center w-8/12"
      @hook="register"
    ></w-form>

    <div class="float-right m-3">
      <WAppLocalePicker></WAppLocalePicker>
    </div>
  </div>
</template>

<script lang="ts">
  import type { WFormRule, WFormSchemaItem } from '/@/components/UI/Form'

  import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
  import { useForm } from '/@/components/UI/Form'
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
        const valid = await validate()

        if (valid) {
          buttonLoading.value = true

          await userActionSignin(signinFormData)

          buttonLoading.value = false
        }
      }

      const signinFormSchemas = computed((): WFormSchemaItem[] => {
        return [
          {
            type: 'Input',
            formProp: {
              prop: 'username',
              label: '',
            },
            componentProp: {
              placeholder: computed(() => t('system.auth.username')),
              clearable: true,
            },
          },
          {
            type: 'Input',
            formProp: {
              prop: 'password',
              label: '',
            },
            componentProp: {
              placeholder: computed(() => t('system.auth.password')),
              clearable: true,
              showPassword: true,
              onKeyup: (e) => {
                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                  onSignin()
                }
              },
            },
          },
          {
            type: 'Checkbox',
            formProp: {
              prop: 'rememberMe',
              label: '',
            },
            componentProp: {
              text: computed(() => t('system.auth.remember')),
            },
          },
          {
            type: 'Button',
            formProp: {
              prop: 'submitButton',
              label: '',
            },
            componentProp: {
              block: true,
              type: 'primary',
              text: computed(() => t('system.auth.signin')),
              loading: buttonLoading,
              style: {
                background: 'transparent',
              },
              onClick: onSignin,
            },
          },
        ]
      })

      const signinFormRules: WFormRule = {
        username: [
          {
            required: true,
            message: t('system.auth.rules.username'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: t('system.auth.rules.password'),
            trigger: 'blur',
          },
        ],
      }

      const [register, { validate }] = useForm({
        schemas: signinFormSchemas,
        rules: signinFormRules,
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
