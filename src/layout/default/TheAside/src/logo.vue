<template>
  <div
    class="h-12 whitespace-nowrap cursor-pointer bg-primary"
    @click="onGoIndex"
  >
    <div
      v-if="getCollapse"
      class="flex flex-row flex-nowrap justify-evenly items-center"
    >
      <img
        src="../../../../assets/images/logo.png"
        alt="Walnut Admin Logo"
        class="h-9 w-9 m-1"
      />
    </div>

    <div v-else class="flex flex-row flex-nowrap justify-evenly items-center">
      <img
        src="../../../../assets/images/logo.png"
        alt="Walnut Admin Logo"
        class="h-9 w-9 m-1"
      />

      <div
        class="font-sans text-xl text-primary subpixel-antialiased not-italic font-bold text-center"
      >
        Walnut Admin
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouterPush } from '/@/router'
  import { useAppStore } from '/@/store'
  import { indexName } from '/@/router/constant'

  export default defineComponent({
    name: 'AsideLogo',

    setup() {
      const { getters } = useAppStore()

      const getCollapse = computed(() => getters.collapse)

      const onGoIndex = () => {
        useRouterPush({ name: indexName })
      }

      return {
        getCollapse,
        onGoIndex,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
