<script lang="ts" setup>
import { UnTyper } from 'untyper'
import AuthFormTab from './src/index.vue'
import { useDemonstrate } from './useDemonstrate'

defineOptions({
  name: 'Auth',
  defaultView: false,
})

const { t, locale } = useAppI18n()
const { title: envTitle } = useAppEnv('title')

const { signInRef } = useDemonstrate()

function onClickBeian() {
  openExternalLink('http://beian.miit.gov.cn/')
}

watch(locale, () => {
  nextTick(() => {
    const title1 = document.getElementById('untyper1')!
    title1.innerHTML = ''
    const unTyper1 = new UnTyper(title1, { speed: 40, startDelay: 100 })
    unTyper1.type(t('app.auth.h1'), { delay: 200 }).go()

    const title2 = document.getElementById('untyper2')!
    title2.innerHTML = ''
    const unTyper2 = new UnTyper(title2, { speed: 40, startDelay: 100 })
    unTyper2.type(t('app.auth.h2')).go()
  })
}, { immediate: true })
</script>

<template>
  <!-- https://tailwindcomponents.com/component/login-register-form-with-image -->
  <section class="min-h-screen flex items-stretch">
    <div class="absolute right-8 top-8 z-50 hstack children:cursor-pointer space-x-4">
      <n-button text>
        <WAppLocalePicker />
      </n-button>
      <n-button text>
        <WAppDarkMode />
      </n-button>
    </div>

    <div
      class="relative hidden w-1/2 items-center bg-cover bg-no-repeat lg:flex"
      style="background-image: url('/assets/auth_bg.jpg')"
    >
      <div class="absolute inset-0 z-0 bg-black opacity-60" />
      <div class="z-10 w-full px-24">
        <h1 id="untyper1" class="text-left text-5xl text-gray-50 font-bold tracking-wide" />
        <p id="untyper2" class="my-4 text-3xl text-gray-50" />
      </div>
    </div>

    <div class="relative w-full flex items-center justify-center bg-bodyColor text-center lg:w-1/2">
      <div>
        <div
          class="absolute inset-0 z-10 items-center bg-cover bg-no-repeat lg:hidden"
          style="background-image: url('/assets/auth_bg.jpg')"
        >
          <div class="absolute inset-0 z-0 bg-black opacity-60" />
        </div>

        <n-card style="z-index: 100" hoverable class="relative rounded-3xl light:shadow-2xl">
          <div class="vstack items-center justify-center">
            <h1 class="mb-4 hstack items-center justify-center">
              <img src="/assets/logo.png" :alt="envTitle" class="w-16 2xl:w-16 lg:w-16 md:w-16 sm:w-12 xl:w-16">
              <span class="ml-4 whitespace-nowrap 2xl:text-3xl lg:text-2xl md:text-2xl xl:text-3xl">
                {{ envTitle }}
              </span>
            </h1>

            <div class="w-full">
              <AuthFormTab ref="signInRef" />

              <WTransition transition-name="fade-left-big" appear :duration="1700" />
            </div>
          </div>
        </n-card>

        <n-text class="absolute bottom-4 right-1/2 translate-x-1/2 cursor-pointer" @click="onClickBeian">
          黑ICP备2022002207号
        </n-text>
      </div>
    </div>
  </section>
</template>
