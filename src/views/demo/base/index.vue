<template>
  <div id="demo-base">
    <div class="float-right w-36">
      <n-anchor
        show-rail
        show-background
        affix
        listen-to="#demo-base"
        :trigger-top="24"
        :top="120"
        style="z-index: 50"
        type="block"
        :bound="100"
      >
        <n-anchor-link title="Icon" href="#Icon" />
        <n-anchor-link title="Button" href="#Button" />
        <n-anchor-link title="Input" href="#Input" />
        <n-anchor-link title="Select" href="#Select" />
      </n-anchor>
    </div>

    <div class="pr-42 vstack space-y-4">
      <DemoIcon />
      <DemoButton id="Button" />
      <DemoInput id="Input" />
      <DemoSelect id="Select" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DemoIcon from './Icon.vue'
  import DemoButton from './Button.vue'
  import DemoInput from './Input.vue'
  import DemoSelect from './Select.vue'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DemoBase',
  })
</script>
