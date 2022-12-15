<script lang="ts" setup></script>

<script lang="ts">
export default defineComponent({
  name: 'FlipperDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Flipper">
    <n-space size="small">
      <w-flipper trigger="hover" width="270px" height="300px">
        <template #front>
          <div class="w-full h-full">
            hover to flip
          </div>
        </template>

        <template #back>
          <div class="w-full h-full">
            this is back
          </div>
        </template>
      </w-flipper>

      <w-flipper trigger="click" width="270px" height="300px">
        <template #front>
          <div class="w-full h-full">
            click to flip
          </div>
        </template>

        <template #back>
          <div class="w-full h-full">
            this is back
          </div>
        </template>
      </w-flipper>
    </n-space>
  </w-demo-card>
</template>
