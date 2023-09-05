<script lang="ts" setup>
const { currentRoute } = useAppRouter()

function onClick() {
  const url = currentRoute.value.query.url as string

  if (!url)
    return

  openExternalLink(url, false, '_self')
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'ExternalLink',
})
</script>

<template>
  <div
    class="h-screen w-screen relative flex items-center justify-center bg-bodyColor"
  >
    <div class="w-full md:w-1/3 mx-auto">
      <div class="flex flex-col p-5 rounded-lg shadow shadow-2xl">
        <div class="flex flex-col items-center text-center">
          <div class="inline-block p-4 bg-yellow-50 rounded-full">
            <svg
              class="w-12 h-12 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
              />
            </svg>
          </div>

          <n-h2 class="mb-2 mt-2 font-semibold">
            {{ $t('app.route.externalLink.title1') }}
          </n-h2>

          <n-h2 class="mb-2 mt-2 text-sm">
            {{ $t('app.route.externalLink.title2') }}
          </n-h2>

          <div
            class="mt-2 hstack items-center gap-2 border-1 border-gray-400 rounded-lg p-3"
          >
            <div
              class="hstack items-center justify-center h-10 w-10 bg-gray-200 rounded-lg"
            >
              <w-icon icon="ant-design:link-outlined" height="24" />
            </div>
            <div class="tracking-wide text-info">
              {{ $route.query.url }}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mt-3">
          <n-button type="warning" @click="onClick">
            <span class="mx-6 tracking-wider">
              {{ $t('app.route.externalLink.button') }}
            </span>
          </n-button>
        </div>
      </div>
    </div>

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
  </div>
</template>
