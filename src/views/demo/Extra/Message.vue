<script lang="ts" setup></script>

<script lang="ts">
export default defineComponent({
  name: 'MessageDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Basic help message">
    <n-space vertical>
      <w-message msg="This is a help message." />

      <w-message
        msg="This is a help message.
        Wrap by string."
      />

      <w-message
        :msg="['This is a help message.', 'Wrap by array.']"
      />

      <w-message msg="Change Icon" icon="ant-design:home-outlined" />

      <w-message
        msg="All n-tooltip props will work."
        placement="right"
        :show-arrow="false"
        :delay="1000"
      />
    </n-space>
  </w-demo-card>
</template>
