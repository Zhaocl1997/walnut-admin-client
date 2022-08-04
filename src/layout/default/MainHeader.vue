<template>
  <div class="w-full">
    <w-transition appear name="slide-up">
      <n-layout-header
        v-if="appSetting.settings.app.showHeader"
        bordered
        :inverted="appSetting.settings.header.inverted"
      >
        <TheHeader
          class="flex-none px-2"
          :style="{ height: appSetting.settings.header.height + 'px' }"
        />
      </n-layout-header>
    </w-transition>

    <w-transition appear name="slide-up">
      <n-layout-header
        v-if="appSetting.settings.app.showTabs"
        bordered
        :inverted="appSetting.settings.header.inverted"
      >
        <TheTab
          class="flex-none px-2"
          :style="{ height: appSetting.settings.tab.height + 'px' }"
        />
      </n-layout-header>
    </w-transition>
  </div>
</template>

<script lang="ts" setup>
  import TheHeader from './TheHeader'
  import TheTab from './TheTab'

  const appSetting = useAppStoreSetting()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TheMainHeader',
  })
</script>
