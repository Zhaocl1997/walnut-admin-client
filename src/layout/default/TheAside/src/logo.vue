<template>
  <div
    class="whitespace-nowrap cursor-pointer"
    @click="onGoIndex"
    :style="{
      height: settings.ForDevelopers.header.height + 'px',
      width:
        (appMemo.collapse
          ? settings.ForDevelopers.menu.collapsedWidth
          : settings.ForDevelopers.menu.width) + 'px',
      zIndex: 999,
    }"
  >
    <div class="*hstack justify-between items-center h-14 w-full">
      <img
        src="/assets/logo.png"
        :alt="`${getAppTitle} Logo`"
        class="h-9 w-9 ml-3"
      />

      <w-transition name="slide-left">
        <div
          v-show="!appMemo.collapse"
          class="text-xl not-italic font-bold text-center mr-8"
        >
          {{ getAppTitle }}
        </div>
      </w-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { appMemo, menu, settings } = useAppState()

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const onGoIndex = () => {
    useRouterPush({ name: menu.value.indexMenuName })
  }
</script>
