<template>
  <w-transition appear name="slide-down">
    <n-layout-footer
      v-if="appSetting.settings.app.showFooter"
      bordered
      :inverted="appSetting.settings.header.inverted"
    >
      <div class="py-0.5">
        <div class="hstack space-x-1 items-center justify-center">
          <span>Copyright</span>

          <w-icon
            class=""
            height="16"
            icon="ant-design:copyright-circle-outlined"
          ></w-icon>

          <span class="whitespace-nowrap">
            2020-present {{ AppTitle }}. All Rights Reserved.
          </span>
        </div>
      </div>
    </n-layout-footer>
  </w-transition>
</template>

<script lang="ts" setup>
  import { NLayoutFooter } from 'naive-ui'

  const appSetting = useAppStoreSetting()

  const { title: AppTitle } = useAppEnv('title')
</script>
