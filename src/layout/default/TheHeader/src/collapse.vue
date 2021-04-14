<template>
  <w-icon
    :icon="
      getCollapse
        ? 'ant-design:menu-fold-outlined'
        : 'ant-design:menu-unfold-outlined'
    "
    @click="onClick"
    width="24"
    class="cursor-pointer dark:text-primary"
  ></w-icon>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useAppStore } from '/@/store'

  export default defineComponent({
    name: 'HeaderCollapse',

    setup() {
      const { getters, dispatch } = useAppStore()

      const getCollapse = computed(() => getters.collapse)

      const onClick = () => {
        dispatch('app/commitMenuCollapse')
      }

      return {
        onClick,
        getCollapse,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
