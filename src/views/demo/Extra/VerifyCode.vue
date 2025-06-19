<script lang="ts" setup>
import type { Recordable } from 'easy-fns-ts'

defineOptions({
  name: 'VerifyCodeDemo',
  defaultView: false,
})

const state = ref<Recordable>({
  input1: '',
  input2: '',
  input3: '',
})

async function onBeforeCountdown() {
  console.log('VerifyCode Demo', 'do something before count down start, need to return boolean')
  await new Promise(res => setTimeout(() => {
    res(true)
  }, 1000))
  return Promise.resolve(true)
}
</script>

<template>
  <WDemoCard title="SMS Input">
    <WJSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <n-space vertical>
          <WVerifyCode v-model:value="state.input1" class="w-72" />

          <WVerifyCode v-model:value="state.input2" class="w-72" :retry-seconds="30" retry-key="refresh-still-count-down" />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Before Countdown Support
        </WTitle>

        <n-space vertical>
          <WVerifyCode v-model:value="state.input3" class="w-72" :on-before-countdown="onBeforeCountdown" />
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
