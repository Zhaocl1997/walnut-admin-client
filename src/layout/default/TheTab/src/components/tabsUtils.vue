<template>
  <div v-for="item in lists" :key="item.icon" @click="item.event">
    <w-icon
      height="24"
      class="border border-solid border-blue-500 cursor-pointer my-auto mr-1"
      :icon="item.icon"
    ></w-icon>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue'
  import type { AppTabUtilListItem } from '../types'

  defineProps({
    lists: Array as PropType<AppTabUtilListItem[]>,
  })
</script>
