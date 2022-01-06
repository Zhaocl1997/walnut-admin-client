<template>
  <div class="*hstack space-x-2 children:cursor-pointer">
    <n-tooltip trigger="hover">
      {{ t('app:base:refresh') }}
      <template #trigger>
        <w-icon
          icon="ant-design:sync-outlined"
          height="20"
          @click="onInit"
          :disabled="tableProps.loading"
        ></w-icon>
      </template>
    </n-tooltip>

    <n-tooltip trigger="hover">
      {{ t('table:base:settings') }}
      <template #trigger>
        <w-icon icon="ant-design:setting-outlined" height="20"></w-icon>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
  import { useTableContext } from '../hooks/useTableContext'

  const { t } = useAppI18n()
  const { onInit, tableProps } = useTableContext()
</script>
