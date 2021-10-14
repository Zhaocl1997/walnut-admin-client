<template>
  <w-demo-card :title="`Button: ${value}`">
    <n-space>
      <w-button @click="onClick">Default</w-button>
      <w-button @click="onClick" type="primary" icon="ant-design:home-outlined"
        >Primary
      </w-button>
      <w-button @click="onClick" type="info" text-prop="Info(prop)"
        >Info</w-button
      >
      <w-button @click="onClick" type="success" :retry="10">Success</w-button>
      <w-button @click="onClick" type="warning" :debounce="1000"
        >Warning(debounce)</w-button
      >
      <w-button @click="onClick" type="error">Error</w-button>
    </n-space>

    <n-divider></n-divider>

    <w-button-group
      :groups="[
        { textProp: 'Button 1', onClick },
        { textProp: 'Button 2', onClick },
        { textProp: 'Button 3', onClick },
      ]"
    ></w-button-group>
  </w-demo-card>
</template>

<script lang="ts">
  export default {
    name: 'ButtonDemo',
  }
</script>

<script setup lang="ts">
  const value = ref(0)

  const onClick = () => {
    value.value++
  }
</script>

<style lang="scss" scoped></style>
