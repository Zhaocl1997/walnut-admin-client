<script lang="ts" setup>
defineOptions({
  name: 'EmailDemo',
  defaultView: false,
})

const state = ref<any>({
  email2: '674351624@qq.com',
})
</script>

<template>
  <w-demo-card title="Email Input">
    <n-list>
      <w-JSON :value="{ state }" height="200px" />

      <n-list-item>
        <w-title prefix="bar">
          Normal usage
        </w-title>

        <w-email-input v-model:value="state.email1" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Feedback
        </w-title>

        <w-email-input v-model:value="state.email2" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Disabled
        </w-title>

        <w-email-input v-model:value="state.email3" disabled />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<style lang="scss" scoped>

</style>
