<template>
  <div v-for="item in lists" :key="item.icon" @click="item.event">
    <w-icon
      height="24"
      class="
        border border-primary
        cursor-pointer
        my-auto
        mr-1
        hover:(border-primaryHover
        text-primaryHover)
      "
      :icon="item.icon"
    ></w-icon>
  </div>
</template>

<script lang="ts" setup>
  import type { AppTabUtilListItem } from '../types'

  defineProps({
    lists: Array as PropType<AppTabUtilListItem[]>,
  })
</script>
