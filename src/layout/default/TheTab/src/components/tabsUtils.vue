<template>
  <div>
    <div v-for="item in lists" :key="item.icon" class="flex items-center">
      <n-tooltip trigger="hover" placement="bottom">
        <template #>{{ item.helpMessage() }}</template>

        <template #trigger>
          <w-icon
            @click="item.event"
            height="20"
            class="cursor-pointer my-auto ring-2 m-1"
            :icon="item.icon"
          ></w-icon
        ></template>
      </n-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { AppTabUtilListItem } from '../types'

  defineProps({
    lists: Array as PropType<AppTabUtilListItem[]>,
  })
</script>
