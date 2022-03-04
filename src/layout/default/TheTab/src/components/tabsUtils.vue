<template>
  <div v-for="item in lists" :key="item.icon" class="flex items-center">
    <w-a-icon
      @click="item.event"
      height="20"
      class="cursor-pointer my-auto mr-1"
      :icon="item.icon"
    ></w-a-icon>
  </div>
</template>

<script lang="ts" setup>
  import type { AppTabUtilListItem } from '../types'

  defineProps({
    lists: Array as PropType<AppTabUtilListItem[]>,
  })
</script>
