<template>
  <div id="demo-extra">
    <div class="float-right w-36">
      <n-anchor
        show-rail
        show-background
        affix
        listen-to="#demo-extra"
        :trigger-top="24"
        :top="120"
        style="z-index: 50"
        type="block"
      >
        <n-anchor-link title="Arrow" href="#Arrow" />
        <n-anchor-link title="Flipper" href="#Flipper" />
        <n-anchor-link title="IconPicker" href="#IconPicker" />
        <n-anchor-link title="JSON" href="#JSON" />
        <n-anchor-link title="Message" href="#Message" />
        <n-anchor-link title="Scrollbar" href="#Scrollbar" />
        <n-anchor-link title="Title" href="#Title" />
        <n-anchor-link title="Transition" href="#Transition" />
        <n-anchor-link title="Axios" href="#Axios" />
      </n-anchor>
    </div>

    <div class="inline-grid grid-cols-2 gap-2 pr-42">
      <DemoArrow id="Arrow" />
      <DemoFlipper id="Flipper" />
      <DemoIconPicker id="IconPicker" />
      <DemoJSON id="JSON" />
      <DemoMessage id="Message" />
      <DemoScrollbar id="Scrollbar" />
      <DemoTitle id="Title" />
      <DemoTransition id="Transition" />
      <DemoAxios id="Axios" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DemoArrow from './Arrow.vue'
  import DemoFlipper from './Flipper.vue'
  import DemoIconPicker from './IconPicker.vue'
  import DemoJSON from './JSON.vue'
  import DemoMessage from './Message.vue'
  import DemoScrollbar from './Scrollbar.vue'
  import DemoTitle from './Title.vue'
  import DemoTransition from './Transition.vue'
  import DemoAxios from './Axios.vue'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DemoExtra',
  })
</script>
