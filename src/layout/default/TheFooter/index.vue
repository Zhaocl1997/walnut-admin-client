<template>
  <w-transition appear name="slide-down">
    <n-layout-footer
      v-if="setting.app.showFooter"
      bordered
      :inverted="setting.header.inverted"
    >
      <div class="py-0.5">
        <div class="hstack space-x-1 items-center justify-center">
          <span>Copyright</span>

          <w-icon
            class=""
            height="16"
            icon="ant-design:copyright-circle-outlined"
          ></w-icon>

          <span> 2020-PRESENT {{ getAppTitle }} All Rights Reserved.</span>
        </div>
      </div>
    </n-layout-footer>
  </w-transition>
</template>

<script lang="ts" setup>
  import { NLayoutFooter } from 'naive-ui'

  const { settings } = useAppState()
  const setting = settings.value.ForDevelopers

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)
</script>
