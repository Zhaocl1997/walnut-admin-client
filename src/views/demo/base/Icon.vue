<template>
  <w-demo-card title="Icon(iconify)">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Base </w-title>
        <w-icon icon="ant-design:home-outlined" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Color </w-title>
        <w-icon icon="ant-design:home-outlined" color="red" />
        <w-icon icon="ant-design:home-outlined" color="green" />
        <w-icon icon="ant-design:home-outlined" color="blue" />
        <w-icon icon="ant-design:home-outlined" color="yellow" />
        <w-icon icon="ant-design:home-outlined" color="orange" />
        <w-icon icon="ant-design:home-outlined" color="indigo" />
        <w-icon icon="ant-design:home-outlined" color="violet" />
        <w-icon icon="ant-design:home-outlined" color="#409EFF" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Width / Height </w-title>
        <w-icon icon="ant-design:home-outlined" width="40" />
        <w-icon icon="ant-design:home-outlined" height="80" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Flip </w-title>
        <w-icon icon="ant-design:home-outlined" horizontal-flip />
        <w-icon icon="ant-design:home-outlined" vertical-flip />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Rotate </w-title>
        <w-icon icon="ant-design:home-outlined" rotate="1" />
        <w-icon icon="ant-design:home-outlined" rotate="2" />
        <w-icon icon="ant-design:home-outlined" rotate="3" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Horizontal shift </w-title>
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          horizontal-align="left"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          horizontal-align="center"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          horizontal-align="right"
          class="border border-red-900"
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Vertical shift </w-title>
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          vertical-align="top"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          vertical-align="middle"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          vertical-align="bottom"
          class="border border-red-900"
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Horizontal sliced icon </w-title>
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          align="left,slice"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          align="center,slice"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          align="right,slice"
          class="border border-red-900"
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Vertical sliced icon </w-title>
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          align="top,slice"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          align="middle,slice"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          align="bottom,slice"
          class="border border-red-900"
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Different way to achieve above effect </w-title>
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          align="left,top"
          class="border border-red-900"
        />
        <w-icon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          align="left,top,slice"
          class="border border-red-900"
        />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'IconDemo',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
