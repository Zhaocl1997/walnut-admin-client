<template>
  <div
    :class="[
      'whitespace-nowrap cursor-pointer px-6 transition-all',
      { 'pl-4 px-0': appMenu.collapse },
    ]"
    @click="onGoIndex"
    :style="{
      height: appSetting.settings.header.height + 'px',
      width:
        (appMenu.collapse
          ? appSetting.settings.menu.collapsedWidth
          : appSetting.settings.menu.width) + 'px',
      zIndex: 999,
    }"
  >
    <div class="hstack justify-between items-center h-full w-full">
      <img
        src="/assets/logo.png"
        :alt="`${getAppTitle} Logo`"
        class="h-9 w-9"
      />

      <w-transition name="zoom-down">
        <div
          v-show="!appMenu.collapse"
          class="text-xl not-italic font-bold text-center"
        >
          {{ getAppTitle }}
        </div>
      </w-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const appMenu = useAppStoreMenu()
  const appSetting = useAppStoreSetting()

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const onGoIndex = async () => {
    await appMenu.goIndex()
  }
</script>
