<template>
  <w-icon
    :icon="
      app.collapse
        ? 'ant-design:menu-fold-outlined'
        : 'ant-design:menu-unfold-outlined'
    "
    @click="onClick"
    width="24"
    class="cursor-pointer dark:text-primary"
  ></w-icon>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAppContext } from '/@/App'

  export default defineComponent({
    name: 'HeaderCollapse',

    setup() {
      const { app } = useAppContext()

      const onClick = () => {
        if (app.value.isMobile) {
          app.value.showAside = !app.value.showAside
          app.value.collapse = false
        } else {
          app.value.collapse = !app.value.collapse
        }
      }

      return {
        onClick,
        app,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
