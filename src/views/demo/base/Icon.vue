<template>
  <el-card>
    <template #header>
      <span>Icon</span>
    </template>

    <w-title show-left>Base </w-title>
    <w-icon icon="ant-design:home-outlined" />

    <br />
    <br />

    <w-title show-left>Color </w-title>
    <w-icon icon="ant-design:home-outlined" color="red" />
    <w-icon icon="ant-design:home-outlined" color="green" />
    <w-icon icon="ant-design:home-outlined" color="blue" />
    <w-icon icon="ant-design:home-outlined" color="yellow" />
    <w-icon icon="ant-design:home-outlined" color="orange" />
    <w-icon icon="ant-design:home-outlined" color="indigo" />
    <w-icon icon="ant-design:home-outlined" color="violet" />

    <w-icon icon="ant-design:home-outlined" color="#409EFF" />

    <br />
    <br />

    <w-title show-left>Width / Height </w-title>
    <w-icon icon="ant-design:home-outlined" width="40" />
    <w-icon icon="ant-design:home-outlined" height="80" />

    <br />
    <br />

    <w-title show-left>Flip </w-title>
    <w-icon icon="ant-design:home-outlined" horizontal-flip />
    <w-icon icon="ant-design:home-outlined" vertical-flip />

    <br />
    <br />

    <w-title show-left>Rotate </w-title>
    <w-icon icon="ant-design:home-outlined" rotate="1" />
    <w-icon icon="ant-design:home-outlined" rotate="2" />
    <w-icon icon="ant-design:home-outlined" rotate="3" />

    <br />
    <br />

    <w-title show-left>Horizontal shift </w-title>
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      horizontal-align="left"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      horizontal-align="center"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      horizontal-align="right"
      class="iconify"
    />

    <br />
    <br />

    <w-title show-left>Vertical shift </w-title>
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      vertical-align="top"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      vertical-align="middle"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      vertical-align="bottom"
      class="iconify"
    />

    <br />
    <br />

    <w-title show-left>Horizontal sliced icon </w-title>
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      align="left,slice"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      align="center,slice"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="24"
      height="40"
      align="right,slice"
      class="iconify"
    />

    <br />
    <br />

    <w-title show-left>Vertical sliced icon </w-title>
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      align="top,slice"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      align="middle,slice"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      align="bottom,slice"
      class="iconify"
    />

    <br />
    <br />

    <w-title show-left>Different way to achieve above effect </w-title>
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      align="left,top"
      class="iconify"
    />
    <w-icon
      icon="ant-design:home-outlined"
      width="40"
      height="24"
      align="left,top,slice"
      class="iconify"
    />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'IconDemo',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped>
  .iconify {
    box-shadow: 0 0 0 1px #e88;
  }
</style>
