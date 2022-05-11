<template>
  <div id="demo-extra">
    <div class="float-right w-36">
      <n-anchor
        show-rail
        show-background
        affix
        listen-to="#demo-extra"
        :trigger-top="120"
        :top="120"
        style="z-index: 50"
        type="block"
      >
        <n-anchor-link title="Arrow" href="#Arrow" />
        <n-anchor-link title="Flipper" href="#Flipper" />
        <n-anchor-link title="IconPicker" href="#IconPicker" />
        <n-anchor-link title="JSON" href="#JSON" />
        <n-anchor-link title="Verify" href="#Verify" />
        <n-anchor-link title="QRCode" href="#QRCode" />
        <n-anchor-link title="Message" href="#Message" />
        <n-anchor-link title="Scrollbar" href="#Scrollbar" />
        <n-anchor-link title="Title" href="#Title" />
        <n-anchor-link title="Transition" href="#Transition" />
        <n-anchor-link title="Axios" href="#Axios" />
        <n-anchor-link title="Modal" href="#Modal" />
        <n-anchor-link title="Drawer" href="#Drawer" />
      </n-anchor>
    </div>

    <div class="grid grid-cols-2 gap-2 pr-42">
      <div class="children:my-2">
        <DemoArrow id="Arrow" />
        <DemoIconPicker id="IconPicker" />
        <DemoJSON id="JSON" />
        <DemoVerify id="Verify" />
        <DemoQRCode id="QRCode" />
      </div>

      <div class="children:my-2">
        <DemoMessage id="Message" />
        <DemoFlipper id="Flipper" />
        <DemoScrollbar id="Scrollbar" />
        <DemoTitle id="Title" />
        <DemoTransition id="Transition" />
        <DemoAxios id="Axios" />
        <DemoModal id="Modal" />
        <DemoDrawer id="Drawer" />
      </div>
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
  import DemoVerify from './Verify.vue'
  import DemoQRCode from './QRCode.vue'
  import DemoModal from './Modal.vue'
  import DemoDrawer from './Drawer.vue'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DemoExtra',
  })
</script>
