<template>
  <el-card>
    <template #header>
      <span>Button：【{{ value }}】</span>
    </template>

    <n-space>
      <WButtonNew @click="onClick">Default</WButtonNew>
      <WButtonNew
        @click="onClick"
        type="primary"
        icon="ant-design:home-outlined"
        >Primary
      </WButtonNew>
      <WButtonNew @click="onClick" type="info" text-prop="Info(prop)"
        >Info</WButtonNew
      >
      <WButtonNew @click="onClick" type="success" :retry="10"
        >Success</WButtonNew
      >
      <WButtonNew @click="onClick" type="warning" :debounce="1000"
        >Warning</WButtonNew
      >
      <WButtonNew @click="onClick" type="error">Error</WButtonNew>
    </n-space>

    <n-divider></n-divider>

    <w-title show-left>Base</w-title>
    <w-button @click="onClick">Click me(slot)</w-button>
    <w-button @click="onClick" text="Click me(prop)"></w-button>
    <w-button disabled @click="onClick">Disabled</w-button>
    <w-button loading @click="onClick">Loading</w-button>
    <w-button type="text" @click="onClick">Text styled</w-button>
    <w-button type="danger" icon="el-icon-delete" @click="onClick"
      >Icon</w-button
    >

    <br />
    <br />

    <w-title show-left>Group(prop)</w-title>
    <el-button-group>
      <w-button type="primary" icon="el-icon-back" @click="onClick"
        >Prev</w-button
      >
      <w-button type="primary" suffix-icon="el-icon-right" @click="onClick"
        >Next</w-button
      >
    </el-button-group>

    <br />
    <br />

    <w-title show-left>Help Message</w-title>
    <w-button type="primary" @click="onClick" help-message="Some help message"
      >Button with help message</w-button
    >

    <br />
    <br />

    <w-title show-left>Group(slot)</w-title>
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

    <w-title show-left>Send email</w-title>
    <w-button
      type="primary"
      icon="el-icon-message"
      :retry-delay="10"
      @click="onClick"
      >Send CAPTCHA</w-button
    >

    <br />
    <br />

    <w-title show-left
      >Load delay(no need to manually control loading state)</w-title
    >
    <w-button type="primary" :load-delay="10" @click="onClick"
      >Request to API</w-button
    >

    <br />
    <br />

    <w-title show-left>Filled parent container width</w-title>
    <w-button type="primary" block @click="onClick">Block mode</w-button>

    <br />
    <br />

    <w-title show-left>Debounce</w-title>
    <w-button type="primary" :debounce="1000" @click="onClick"
      >Debounce 1000ms</w-button
    >
  </el-card>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import WButtonNew from '/@/components/UINew/Button'

  export default defineComponent({
    name: 'ButtonDemo',

    components: { WButtonNew },

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
