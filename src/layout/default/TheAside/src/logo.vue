<template>
  <div class="h-12 whitespace-nowrap cursor-pointer" @click="onGoIndex">
    <div class="*hstack justify-evenly items-center">
      <img src="/assets/logo.png" alt="Walnut Admin Logo" class="h-9 w-9 m-1" />

      <w-transition name="scale">
        <span
          v-show="!app.collapse"
          class="app-text text-xl not-italic font-bold text-center"
        >
          {{ getAppTitle }}
        </span>
      </w-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { app, menu } = useAppState()

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const onGoIndex = () => {
    useRouterPush({ name: menu.indexMenuName })
  }
</script>
