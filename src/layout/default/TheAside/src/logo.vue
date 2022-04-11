<template>
  <div
    :class="[
      'whitespace-nowrap cursor-pointer px-6 transition-all',
      { 'pl-4 px-0': appMemo.collapse },
    ]"
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
    <div class="hstack justify-between items-center h-full w-full">
      <img
        src="/assets/logo.png"
        :alt="`${getAppTitle} Logo`"
        class="h-9 w-9"
      />

      <w-transition name="zoom-down">
        <div
          v-show="!appMemo.collapse"
          class="text-xl not-italic font-bold text-center"
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
