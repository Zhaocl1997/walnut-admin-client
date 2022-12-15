<script lang="ts">
export default defineComponent({
  name: 'WDemoCard',

  props: {
    title: String as PropType<string>,
    description: [String, Array] as PropType<string | string[]>,
  },

  emits: [],

  setup(props, ctx) {},
})
</script>

<template>
  <w-card header-preset="collapse">
    <template #header>
      <w-title :help-message="description">
        {{ title }}
      </w-title>
    </template>
    <template #default>
      <slot />
    </template>
  </w-card>
</template>
