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
import DemoNaiveMsg from './NaiveMsg.vue'
import DemoFile from './File.vue'
import DemoAuthorize from './Authorize.vue'
import DemoTextScroll from './TextScroll.vue'
import DemoNumberPhoneInput from './PhoneNumberInput.vue'
import DemoEmailInput from './EmailInput.vue'

const appAdapter = useAppStoreAdapter()
</script>

<script lang="ts">
export default defineComponent({
  name: 'DemoExtra',
})
</script>

<template>
  <div id="demo-extra">
    <div v-if="!appAdapter.isMobile" class="float-right w-36">
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
        <n-anchor-link title="NaiveMsg" href="#NaiveMsg" />
        <n-anchor-link title="Arrow" href="#Arrow" />
        <n-anchor-link title="IconPicker" href="#IconPicker" />
        <n-anchor-link title="JSON" href="#JSON" />
        <n-anchor-link title="Verify" href="#Verify" />
        <n-anchor-link title="QRCode" href="#QRCode" />
        <n-anchor-link title="Modal" href="#Modal" />
        <n-anchor-link title="Drawer" href="#Drawer" />
        <n-anchor-link title="TextScroll" href="#TextScroll" />
        <n-anchor-link title="PhoneNumberInput" href="#PhoneNumberInput" />

        <n-anchor-link title="Message" href="#Message" />
        <n-anchor-link title="Flipper" href="#Flipper" />
        <n-anchor-link title="Scrollbar" href="#Scrollbar" />
        <n-anchor-link title="Title" href="#Title" />
        <n-anchor-link title="Transition" href="#Transition" />
        <n-anchor-link title="Axios" href="#Axios" />
        <n-anchor-link title="File" href="#File" />
        <n-anchor-link title="Authorize" href="#Authorize" />
        <n-anchor-link title="EmailInput" href="#EmailInput" />
      </n-anchor>
    </div>

    <div
      class="grid 2xl:grid-cols-2 grid-cols-1 2xl:gap-2 gap-0" :class="[
        { 'pr-42': !appAdapter.isMobile },
      ]"
    >
      <div class="children:my-2">
        <!-- <DemoNaiveMsg id="NaiveMsg" />
        <DemoArrow id="Arrow" />
        <DemoIconPicker id="IconPicker" />
        <DemoJSON id="JSON" />
        <DemoVerify id="Verify" />
        <DemoQRCode id="QRCode" />
        <DemoModal id="Modal" />
        <DemoDrawer id="Drawer" />
        <DemoTextScroll id="TextScroll" />
        <DemoNumberPhoneInput id="PhoneNumberInput" /> -->
      </div>

      <div class="children:my-2">
        <!-- <DemoMessage id="Message" />
        <DemoFlipper id="Flipper" />
        <DemoScrollbar id="Scrollbar" />
        <DemoTitle id="Title" />
        <DemoTransition id="Transition" />
        <DemoAxios id="Axios" />
        <DemoFile id="File" />
        <DemoAuthorize id="Authorize" /> -->
        <DemoEmailInput id="EmailInput" />
      </div>
    </div>
  </div>
</template>
