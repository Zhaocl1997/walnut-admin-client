<template>
  <div class="p-1 inline-block">
    <w-icon
      height="24"
      class="border border-solid border-blue-500 cursor-pointer my-auto mr-1"
      icon="ant-design:sync-outlined"
    ></w-icon>

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

  import { getTabsContext } from '../hooks/useTabsContext'

  export default defineComponent({
    name: 'TabsRightMethods',

    inheritAttrs: false,

    setup() {
      const { rightMethods } = getTabsContext()

      return { rightMethods }
    },
  })
</script>

<style lang="scss" scoped></style>
