<script lang="ts" setup>
const appSetting = useAppStoreSetting()
</script>

<template>
  <WTransition appear :transition-name="appSetting.getFooterTransition">
    <n-layout-footer
      v-if="appSetting.getFooterShow"
      :id="appSetting.getFooterId"
      bordered
      :inverted="appSetting.getFooterInverted"
      :style="{
        zIndex: 999,
        height: `${appSetting.getFooterHeight}px`,
      }"
      :class="{ 'bottom-0': appSetting.getFooterFixed }"
      class="sticky left-0 flex-none"
    >
      <div class="h-full flex items-center justify-center whitespace-nowrap">
        {{ appSetting.footer.content }}
      </div>
    </n-layout-footer>
  </WTransition>
</template>
