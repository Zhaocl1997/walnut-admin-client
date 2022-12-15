<script lang="ts" setup>
const appSetting = useAppStoreSetting()
</script>

<template>
  <w-transition appear :name="appSetting.getFooterTransition">
    <n-layout-footer
      v-if="appSetting.getFooterShow"
      :id="appSetting.getFooterId"
      bordered
      :inverted="appSetting.getFooterInverted"
      :style="{
        zIndex: 999,
        height: `${appSetting.footer.height}px`,
      }"
      :class="{ 'bottom-0': appSetting.getFooterFixed }"
      class="flex-none sticky left-0"
    >
      <div class="h-full flex items-center justify-center whitespace-nowrap">
        {{ appSetting.footer.content }}
      </div>
    </n-layout-footer>
  </w-transition>
</template>
