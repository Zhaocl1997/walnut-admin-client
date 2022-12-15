<script lang="ts" setup>
const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()

const { title: AppTitle } = useAppEnv('title')

const onGoIndex = async () => {
  await appMenu.goIndex()
}
</script>

<template>
  <w-transition appear :name="appSetting.getLogoTransition">
    <div
      v-if="appSetting.getLogoShow"
      :id="appSetting.getLogoId"
      class="whitespace-nowrap cursor-pointer px-6 transition-all" :class="[
        {
          'pl-4 px-0': appMenu.collapse,
          'fixed': appSetting.getLogoFixed,
        },
      ]"
      :style="{
        height: `${appSetting.header.height}px`,
        width:
          `${appMenu.collapse
            ? appSetting.menu.collapsedWidth
            : appSetting.menu.width}px`,
        zIndex: 999,
      }"
      @click="onGoIndex"
    >
      <div class="hstack justify-between items-center h-full w-full">
        <img src="/assets/logo.png" :alt="`${AppTitle} Logo`" class="h-9 w-9">

        <w-transition name="zoom-down">
          <div
            v-show="!appMenu.collapse"
            class="text-xl not-italic font-bold text-center"
          >
            {{ AppTitle }}
          </div>
        </w-transition>
      </div>
    </div>
  </w-transition>
</template>
