<script lang="ts" setup>
defineOptions({
  name: 'PasswordDemo',
  defaultView: false,
})

const state = ref({
  password1: '',
  password2: '',
  password3: '',
  capslock: false,
})
</script>

<template>
  <WDemoCard title="Password Input">
    <WJSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <n-space vertical>
          <WPassword v-model:value="state.password1" />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Progress and Capslock support
        </WTitle>

        <n-space vertical>
          <WPassword
            v-model:value="state.password2"
            progress
          />

          <WPassword
            v-model:value="state.password3"
            capslock
          />
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
