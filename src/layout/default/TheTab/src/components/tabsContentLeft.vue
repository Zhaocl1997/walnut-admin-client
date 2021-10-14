<template>
  <div class="p-1">
    <div
      class="inline-block"
      v-for="item in iconList"
      :key="item.icon"
      @click="item.event"
    >
      <w-icon
        height="24"
        class="border border-solid border-blue-500 cursor-pointer my-auto mr-1"
        :icon="item.icon"
      ></w-icon>
    </div>
  </div>
</template>

<script lang="ts">
  import { getTabsContext } from '../hooks/useTabsContext'

  export default defineComponent({
    name: 'TabsLeftMethods',

    inheritAttrs: false,

    setup() {
      const { leftMethods } = getTabsContext()

      const iconList = reactive([
        {
          icon: 'ant-design:double-left-outlined',
          event: () => {
            leftMethods.onScrollToStart()
          },
        },
        {
          icon: 'ant-design:aim-outlined',
          event: () => {
            leftMethods.onScrollToCurrent()
          },
        },
      ])

      return {
        iconList,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
