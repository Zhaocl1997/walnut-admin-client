<template>
  <!-- https://tailwindcomponents.com/component/login-register-form-with-image -->
  <section class="min-h-screen flex items-stretch">
    <div
      class="hstack space-x-4 absolute top-8 right-8 z-50 children:cursor-pointer"
    >
      <n-button text>
        <WAppLocalePicker></WAppLocalePicker>
      </n-button>
      <n-button text>
        <WAppDarkMode></WAppDarkMode>
      </n-button>
    </div>

    <div
      class="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center"
      style="background-image: url('/assets/auth_bg.jpg')"
    >
      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide text-gray-50">
          {{ t('app.signin.h1') }}
        </h1>
        <p class="text-3xl my-4 text-gray-50">{{ t('app.signin.h2') }}</p>
      </div>
    </div>

    <div
      class="lg:w-1/2 w-full flex items-center justify-center text-center bg-bodyColor relative"
    >
      <div>
        <div
          class="absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center"
          style="background-image: url('/assets/auth_bg.jpg')"
        >
          <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>

        <n-card
          style="z-index: 100"
          hoverable
          class="rounded-3xl relative light:shadow-2xl"
        >
          <div class="vstack items-center justify-center">
            <h1 class="hstack items-center justify-center mb-4">
              <img
                src="/assets/logo.png"
                :alt="getAppTitle"
                class="w-16 sm:w-12 md:w-16 lg:w-16 xl:w-16 2xl:w-16"
              />
              <span
                class="md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl ml-4 whitespace-nowrap"
              >
                {{ getAppTitle }}
              </span>
            </h1>

            <div v-if="!back" class="w-full">
              <SignIn ref="signInRef"></SignIn>

              <w-transition name="fade-left-big" appear :duration="1700">
                <n-text
                  type="info"
                  class="text-xs cursor-pointer float-right"
                  @click="onToggle"
                >
                  {{ t('app.signin.goSignup') }}
                </n-text>
              </w-transition>
            </div>

            <div v-else class="w-full">
              <SignUp></SignUp>

              <w-transition name="fade-up-big" appear :duration="1900">
                <n-text
                  type="info"
                  class="text-xs cursor-pointer float-right"
                  @click="onToggle"
                >
                  {{ t('app.signup.goSignin') }}
                </n-text>
              </w-transition>
            </div>
          </div>
        </n-card>

        <n-text
          class="absolute bottom-4 right-1/2 translate-x-1/2 cursor-pointer"
          @click="onClickBeian"
        >
          黑ICP备2022002207号
        </n-text>
      </div>
    </div>
  </section>
</template>

<script lang="tsx" setup>
  import SignIn from './signin/index.vue'
  import SignUp from './signup.vue'
  import { useDemonstrate } from './useDemonstrate'

  const { t } = useAppI18n()
  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const back = ref(false)

  const { signInRef } = useDemonstrate()

  const onClickBeian = () => {
    openExternalLink('http://beian.miit.gov.cn/')
  }

  const onToggle = () => (back.value = !back.value)
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'Auth',

    defaultView: false,
  })
</script>
