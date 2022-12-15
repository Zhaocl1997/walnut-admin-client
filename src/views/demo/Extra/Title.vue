<script lang="ts" setup></script>

<script lang="ts">
export default defineComponent({
  name: 'TitleDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Basic Title">
    <n-space size="small" vertical>
      <w-title>This is a normal title.</w-title>

      <w-title help-message="This is a help message.">
        This is a title with a help message.
      </w-title>

      <w-title prefix="bar">
        This is a title with state.
      </w-title>
      <w-title prefix="bar" type="info">
        This is a title with state.
      </w-title>
      <w-title prefix="bar" type="error">
        This is a title with state.
      </w-title>
      <w-title prefix="bar" type="warning">
        This is a title with state.
      </w-title>
    </n-space>
  </w-demo-card>
</template>
