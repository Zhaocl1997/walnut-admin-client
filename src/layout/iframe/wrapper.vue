<script lang="ts" setup>
import { treeToArr } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'
import WIFrame from './index.vue'

defineOptions({
  name: 'TheIFrameWrapper',
})

const appSetting = useAppStoreSetting()
const appMenu = useAppStoreMenu()
const appTab = useAppStoreTab()

const getAllIFramePages = computed(() =>
  treeToArr(cloneDeep(appMenu.menus))
    .filter(
      i => i.ternal === AppConstMenuTernal.INTERNAL && i.url && i.cache,
    )
    .map(i => ({
      name: i.name,
      url: i.url,
      cache: i.cache,
    }))
    .filter(e => appTab.tabs.map(i => i.name).includes(e.name!)),
)
</script>

<template>
  <template v-if="getAllIFramePages.length > 0">
    <template v-for="item in getAllIFramePages" :key="item.name">
      <w-transition :name="appSetting.getTransition" mode="out-in" appear>
        <WIFrame
          v-if="item.url && appTab.tabs.map((i) => i.name).includes(item.name!)"
          v-show="item.name === $route.name" :frame-src="item.url!"
        />
      </w-transition>
    </template>
  </template>
</template>
