<script lang="ts" setup>
import type { AppTabUtilListItem } from '../types'

defineProps({
  lists: Array as PropType<AppTabUtilListItem[]>,
})
</script>

<template>
  <div>
    <div v-for="item in lists" :key="item.icon" class="flex items-center">
      <n-tooltip trigger="hover" placement="bottom">
        <template #default>
          {{ item.helpMessage() }}
        </template>

        <template #trigger>
          <WIcon
            height="20"
            class="m-1 my-auto cursor-pointer ring-2"
            :icon="item.icon"
            @click="item.event"
          />
        </template>
      </n-tooltip>
    </div>
  </div>
</template>
