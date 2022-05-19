<template>
  <template
    v-if="getAllIFramePages.length > 0"
    v-for="item in getAllIFramePages"
    :key="item.name"
  >
    <w-transition
      :name="
        appSetting.settings.app.showAnimation
          ? appSetting.settings.app.animationName
          : null
      "
      mode="out-in"
      appear
    >
      <WIFrame
        v-if="item.url && appTab.tabs.map((i) => i.name).includes(item.name!)"
        v-show="item.name === $route.name"
        :frame-src="item.url!"
      ></WIFrame>
    </w-transition>
  </template>
</template>

<script lang="ts" setup>
  import { treeToArr } from 'easy-fns-ts'
  import { cloneDeep } from 'lodash-es'
  import WIFrame from './index.vue'

  const appSetting = useAppSettingStore()
  const appMenu = useAppMenuStore()
  const appTab = useAppTabStore()

  const getAllIFramePages = computed(() =>
    treeToArr(cloneDeep(appMenu.menus))
      .filter((i) => i.ternal === MenuTernalConst.INTERNAL && i.url && i.cache)
      .map((i) => ({
        name: i.name,
        url: i.url,
        cache: i.cache,
      }))
      .filter((e) => appTab.tabs.map((i) => i.name).includes(e.name!))
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TheIFrameWrapper',
  })
</script>
