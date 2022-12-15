<script lang="ts" setup>
import DemoIcon from './Icon.vue'
import DemoButton from './Button.vue'
import DemoInput from './Input.vue'
import DemoSelect from './Select.vue'
import DemoRadio from './Radio.vue'
import DemoCheckbox from './Checkbox.vue'
import DemoDynamicTags from './DynamicTags.vue'
import DemoTree from './Tree.vue'
import DemoAreaCascader from './AreaCascader.vue'
import DemoLocaleSelect from './LocaleSelect.vue'
import DemoLocation from './LocationPicker.vue'
import DemoDict from './Dict.vue'
import DemoColorPicker from './ColorPicker.vue'

const appAdapter = useAppStoreAdapter()
</script>

<script lang="ts">
export default defineComponent({
  name: 'DemoUI',
})
</script>

<template>
  <div id="demo-ui">
    <div v-if="!appAdapter.isMobile" class="float-right w-36">
      <n-anchor
        show-rail
        show-background
        affix
        listen-to="#demo-ui"
        :trigger-top="120"
        :top="120"
        style="z-index: 50"
        type="block"
      >
        <n-anchor-link title="Icon" href="#Icon" />
        <n-anchor-link title="Button" href="#Button" />
        <n-anchor-link title="Input" href="#Input" />
        <n-anchor-link title="Select" href="#Select" />
        <n-anchor-link title="Checkbox" href="#Checkbox" />
        <n-anchor-link title="Dict" href="#Dict" />

        <n-anchor-link title="Tree" href="#Tree" />
        <n-anchor-link
          title="AreaCascader"
          href="#AreaCascader"
        />
        <n-anchor-link title="Location" href="#Location" />
        <n-anchor-link title="Radio" href="#Radio" />
        <n-anchor-link title="DynamicTags" href="#DynamicTags" />
        <n-anchor-link
          title="LocaleSelect"
          href="#LocaleSelect"
        />
        <n-anchor-link title="ColorPicker" href="#ColorPicker" />
      </n-anchor>
    </div>

    <div
      class="grid 2xl:grid-cols-2 grid-cols-1 2xl:gap-2 gap-0" :class="[
        { 'pr-42': !appAdapter.isMobile },
      ]"
    >
      <div class="children:my-2">
        <DemoIcon id="Icon" />
        <DemoButton id="Button" />
        <DemoInput id="Input" />
        <DemoSelect id="Select" />
        <DemoCheckbox id="Checkbox" />
        <DemoDict id="Dict" />
      </div>

      <div class="children:my-2">
        <DemoTree id="Tree" />
        <DemoAreaCascader id="AreaCascader" />
        <DemoLocation id="Location" />
        <DemoRadio id="Radio" />
        <DemoDynamicTags id="DynamicTags" />
        <DemoLocaleSelect id="LocaleSelect" />
        <DemoColorPicker id="ColorPicker" />
      </div>
    </div>
  </div>
</template>
