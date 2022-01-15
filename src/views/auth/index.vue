<template>
  <!-- https://tailwindcomponents.com/component/login-register-form-with-image -->
  <section class="min-h-screen flex items-stretch">
    <div
      class="*hstack space-x-4 absolute top-8 right-8 z-50 children:cursor-pointer"
    >
      <WAppLocalePicker />
      <WAppDarkMode />
    </div>

    <div
      class="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center"
      style="background-image: url('/assets/auth_bg.jpg')"
    >
      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide text-gray-50">
          {{ t('app:signin:h1') }}
        </h1>
        <p class="text-3xl my-4 text-gray-50">{{ t('app:signin:h2') }}</p>
      </div>
    </div>

    <div
      class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-32 px-0 z-0 bg-bodyColor"
    >
      <div
        class="absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center"
        style="background-image: url('/assets/auth_bg.jpg')"
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>

      <n-card>
        <div class="w-full py-6 z-20">
          <h1 class="my-2 w-auto inline-flex items-center">
            <img src="/assets/logo.png" :alt="title" class="w-20" />
            <span style="color: var(--text-color-base)" class="text-4xl ml-4">
              {{ title }}
            </span>
          </h1>

          <SignIn class="m-auto text-justify w-7/12" />
        </div>
      </n-card>
    </div>
  </section>
</template>

<script lang="ts">
  import SignIn from './signin.vue'
  import SignUp from './signup.vue'

  export default defineComponent({
    name: 'Auth',

    defaultView: false,

    components: { SignIn, SignUp },

    setup() {
      const { t } = useAppI18n()
      const title = computed(() => import.meta.env.VITE_APP_TITLE)

      return {
        t,
        title,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
