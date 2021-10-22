<template>
  <div class="select-none">
    <div class="*hstack justify-between h-full items-center">
      <div class="*hstack justify-start space-x-2">
        <HeaderCollapse />
        <HeaderBreadCrumb v-if="!app.isMobile" />
      </div>

      <div
        class="
          *hstack
          justify-end
          space-x-2
          h-full
          children:(cursor-pointer
          flex
          items-center
          px-0.5
          h-full)
        "
      >
        <WAppFullScreen v-if="!app.isMobile" />
        <WAppLocalePicker />
        <WAppDarkMode />
        <HeaderAvatar />
        <AppSettings />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderBreadCrumb from './breadcrumb.vue'
  import HeaderCollapse from './collapse.vue'
  import HeaderAvatar from './avatar.vue'
  import AppSettings from '/@/components/App/AppSettings'

  const { app } = useAppContext()
</script>
