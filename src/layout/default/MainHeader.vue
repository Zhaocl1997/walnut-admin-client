<template>
  <div :style="{ width: getContentWidth }">
    <w-transition appear name="slide-up">
      <n-layout-header
        v-if="setting.app.showHeader"
        bordered
        :inverted="setting.header.inverted"
      >
        <TheHeader
          class="flex-none px-2"
          :style="{ height: setting.header.height + 'px' }"
        />
      </n-layout-header>
    </w-transition>

    <w-transition appear name="slide-up">
      <n-layout-header
        v-if="setting.app.showTabs"
        bordered
        :inverted="setting.header.inverted"
      >
        <TheTab
          class="flex-none px-2"
          :style="{ height: setting.tab.height + 'px' }"
        />
      </n-layout-header>
    </w-transition>
  </div>
</template>

<script lang="ts" setup>
  import TheHeader from './TheHeader'
  import TheTab from './TheTab'
  import { getContentWidth } from '/@/settings'

  const { settings } = useAppState()
  const setting = settings.value.ForDevelopers
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TheMainHeader',
  })
</script>
