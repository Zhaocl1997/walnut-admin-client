<script lang="ts" setup>
defineOptions({
  name: 'FlipperDemo',
  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Flipper">
    <n-space size="small">
      <w-flipper trigger="hover" width="270px" height="300px">
        <template #front>
          <div class="h-full w-full">
            hover to flip
          </div>
        </template>

        <template #back>
          <div class="h-full w-full">
            this is back
          </div>
        </template>
      </w-flipper>

      <w-flipper trigger="click" width="270px" height="300px">
        <template #front>
          <div class="h-full w-full">
            click to flip
          </div>
        </template>

        <template #back>
          <div class="h-full w-full">
            this is back
          </div>
        </template>
      </w-flipper>
    </n-space>
  </w-demo-card>
</template>
