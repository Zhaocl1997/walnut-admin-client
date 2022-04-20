<template>
  <n-card title="sys:menu:account">
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦"> 七里香 </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
  const state = ref()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AccountSetting',
  })
</script>
