<template>
  <div>
    <w-demo-card title="Signature Pad Demo">
      <n-list>
        <n-list-item>
          <w-title prefix="bar"> Basic </w-title>

          <WSignPad :height="'300px'" :width="'800px'"></WSignPad>
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <w-title prefix="bar"> Disabled </w-title>

          <WSignPad
            :height="'300px'"
            :width="'800px'"
            :default-url="url"
            disabled
          ></WSignPad>
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <w-title prefix="bar"> Watermark </w-title>

          <WSignPad
            :height="'300px'"
            :width="'800px'"
            content="walnut admin"
          ></WSignPad>
        </n-list-item>
      </n-list>
    </w-demo-card>
  </div>
</template>

<script lang="ts" setup>
  import { url } from './url'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'SignPadDemo',
  })
</script>
