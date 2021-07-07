<template>
  <n-card>
    <template #header>
      <n-alert :title="title" type="info">
        {{ description }}
      </n-alert>
    </template>
    <template #default> <slot></slot> </template>
  </n-card>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WDemoCard',

    inheritAttrs: false,

    props: {
      title: String as PropType<string>,
      description: String as PropType<string>,
    },

    emits: [],

    setup(props, ctx) {},
  })
</script>
