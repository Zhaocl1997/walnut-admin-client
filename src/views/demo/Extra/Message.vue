<template>
  <w-demo-card title="Basic help message">
    <n-space vertical>
      <w-message msg="This is a help message."></w-message>

      <w-message
        :msg="'This is a help message. \\n Wrap by string.'"
      ></w-message>

      <w-message
        :msg="['This is a help message.', 'Wrap by array.']"
      ></w-message>

      <w-message msg="Change Icon" icon="ant-design:home-outlined"></w-message>

      <w-message
        msg="All n-tooltip props will work."
        placement="right"
        :show-arrow="false"
        :delay="1000"
      ></w-message>
    </n-space>
  </w-demo-card>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default defineComponent({
    name: 'MessageDemo',

    defaultView: false,
  })
</script>
