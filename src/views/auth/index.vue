<template>
  <!-- https://tailwindcomponents.com/component/login-register-form-with-image -->
  <section class="min-h-screen flex items-stretch">
    <div
      class="hstack space-x-4 absolute top-8 right-8 z-50 children:cursor-pointer"
    >
      <n-button text>
        <WAppLocalePicker />
      </n-button>
      <n-button text>
        <WAppDarkMode />
      </n-button>
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
      class="lg:w-1/2 w-full flex items-center justify-center text-center lg:px-16 xl:px-32 2xl:px-48 px-0 z-0 bg-bodyColor"
    >
      <div
        class="absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center"
        style="background-image: url('/assets/auth_bg.jpg')"
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>

      <n-card
        style="z-index: 100"
        hoverable
        class="mx-1/8 sm:mx-1/4 md:mx-1/4 lg:mx-1/6 xl:mx-1/6 2xl:mx-1/6 rounded-3xl light:shadow-2xl"
      >
        <div class="vstack items-center justify-center">
          <h1 class="hstack items-center justify-center mb-4">
            <img
              src="/assets/logo.png"
              :alt="title"
              class="w-16 sm:w-12 md:w-16 lg:w-16 xl:w-16 2xl:w-16"
            />
            <span
              class="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl ml-4 whitespace-nowrap"
            >
              {{ title }}
            </span>
          </h1>

          <SignIn />
        </div>
      </n-card>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import SignIn from './signin/index.vue'
  import SignUp from './signup.vue'

  const { t } = useAppI18n()
  const title = computed(() => import.meta.env.VITE_APP_TITLE)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'Auth',

    defaultView: false,
  })
</script>
