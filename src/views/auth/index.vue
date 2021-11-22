<template>
  <!-- https://tailwindcomponents.com/component/login-register-form-with-image -->
  <section class="min-h-screen flex items-stretch text-white">
    <div class="absolute top-8 right-8 cursor-pointer z-50">
      <WAppLocalePicker></WAppLocalePicker>
    </div>

    <div
      class="
        lg:flex
        w-1/2
        hidden
        bg-gray-500 bg-no-repeat bg-cover
        relative
        items-center
      "
      style="background-image: url('/assets/auth_bg.jpg')"
    >
      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide">
          {{ t('app:signin:h1') }}
        </h1>
        <p class="text-3xl my-4">{{ t('app:signin:h2') }}</p>
      </div>
    </div>

    <div
      class="
        lg:w-1/2
        w-full
        flex
        items-center
        justify-center
        text-center
        md:px-16
        px-0
        z-0
      "
      style="background-color: #161616"
    >
      <div
        class="
          absolute
          lg:hidden
          z-10
          inset-0
          bg-gray-500 bg-no-repeat bg-cover
          items-center
        "
        style="background-image: url('/assets/auth_bg.jpg')"
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div class="w-full py-6 z-20">
        <h1 class="my-2 w-auto inline-flex items-center">
          <img src="/assets/logo.png" :alt="title" class="w-20" />
          <span class="text-4xl ml-4">{{ title }}</span>
        </h1>

        <SignIn class="m-auto text-justify w-9/12 sm:w-6/12" />
      </div>
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
