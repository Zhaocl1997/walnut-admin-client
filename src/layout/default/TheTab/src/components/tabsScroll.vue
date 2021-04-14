<template>
  <w-scrollbar ref="scrollRef" @scroll="closeContextMenu" vertical>
    <slot></slot>
  </w-scrollbar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTabsContext } from '../hooks/useTabsContext'

  export default defineComponent({
    name: 'TabsScroll',

    inheritAttrs: false,

    setup() {
      const { getTabsContext } = useTabsContext()

      const { scrollRef, closeContextMenu } = getTabsContext()

      return { scrollRef, closeContextMenu }
    },
  })
</script>

<style lang="scss" scoped></style>
