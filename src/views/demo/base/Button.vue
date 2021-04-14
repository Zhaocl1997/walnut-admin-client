<template>
  <el-card>
    <template #header>
      <span>Button：【{{ value }}】</span>
    </template>

    <WTitle show-left>Base</WTitle>
    <w-button @click="onClick">Click me(slot)</w-button>
    <w-button @click="onClick" text="Click me(prop)"></w-button>
    <w-button disabled @click="onClick">Disabled</w-button>
    <w-button loading @click="onClick">Loading</w-button>
    <w-button type="text" @click="onClick">Text styled</w-button>
    <w-button type="danger" prefix-icon="el-icon-delete" @click="onClick"
      >Icon</w-button
    >

    <br />
    <br />

    <WTitle show-left>Group(prop)</WTitle>
    <el-button-group>
      <w-button type="primary" prefix-icon="el-icon-back" @click="onClick"
        >Prev</w-button
      >
      <w-button type="primary" suffix-icon="el-icon-right" @click="onClick"
        >Next</w-button
      >
    </el-button-group>

    <br />
    <br />

    <WTitle show-left>Group(slot)</WTitle>
    <el-button-group>
      <w-button type="primary" @click="onClick">
        Prev
        <template #prefix>
          <i class="el-icon-back"></i>
        </template>
      </w-button>

      <w-button type="primary" @click="onClick">
        Next
        <template #suffix>
          <i class="el-icon-right"></i>
        </template>
      </w-button>
    </el-button-group>

    <br />
    <br />

    <WTitle show-left>Send email</WTitle>
    <w-button
      type="primary"
      prefix-icon="el-icon-message"
      retry-delay="10"
      @click="onClick"
      >Send CAPTCHA</w-button
    >

    <br />
    <br />

    <WTitle show-left
      >Load delay(no need to manually control loading state)</WTitle
    >
    <w-button type="primary" load-delay="10" @click="onClick"
      >Request to API</w-button
    >

    <br />
    <br />

    <WTitle show-left>Filled parent container width</WTitle>
    <w-button type="primary" block @click="onClick">Block mode</w-button>

    <br />
    <br />

    <WTitle show-left>Throttle</WTitle>
    <w-button type="primary" throttle="1000" @click="onClick"
      >Throttle 1000ms</w-button
    >
  </el-card>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'

  export default defineComponent({
    name: 'ButtonDemo',

    setup() {
      const value = ref(0)

      const onClick = () => {
        value.value++
      }

      return {
        value,
        onClick,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
