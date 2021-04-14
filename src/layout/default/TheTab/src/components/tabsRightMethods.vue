<template>
  <div class="p-1 inline-block">
    <!-- context menu -->
    <el-dropdown trigger="click">
      <div>
        <w-icon
          height="24"
          class="border border-solid border-blue-500 cursor-pointer my-auto mr-1"
          icon="ant-design:down-outlined"
        ></w-icon>
      </div>

      <template #dropdown>
        <TabsContextMenu />
      </template>
    </el-dropdown>

    <!-- scroll to right -->
    <w-icon
      height="24"
      class="border border-solid border-blue-500 cursor-pointer my-auto mr-1"
      icon="ant-design:double-right-outlined"
      @click="rightMethods.onScrollToEnd"
    ></w-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import TabsContextMenu from './tabsContextMenu.vue'

  import { useTabsContext } from '../hooks/useTabsContext'

  export default defineComponent({
    name: 'TabsRightMethods',

    inheritAttrs: false,

    components: { TabsContextMenu },

    setup() {
      const { getTabsContext } = useTabsContext()

      const { rightMethods } = getTabsContext()

      return { rightMethods }
    },
  })
</script>

<style lang="scss" scoped></style>
