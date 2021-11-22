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
    }"
  >
    <div class="*hstack justify-evenly items-center">
      <img src="/assets/logo.png" alt="Walnut Admin Logo" class="h-9 w-9 m-1" />

      <w-transition name="slide-up">
        <div
          v-show="!appMemo.collapse"
          class="app-text text-xl not-italic font-bold text-center"
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
