<script lang="ts" setup>
defineOptions({
  name: 'SMSInputDemo',
  defaultView: false,
})

const state = ref({
  input1: '',
  input2: '',
  input3: '',
  input4: '',
  input5: '',
})

async function onBeforeCountdown() {
  AppConsoleLog('SMSInput Demo', 'do something before count down start, need to return boolean')
  await new Promise(res => setTimeout(() => {
    res(true)
  }, 1000))
  return Promise.resolve(true)
}

async function onSuccess(startCountdown: Fn) {
  AppConsoleLog('SMSInput Demo', 'do something after verify success, need to call startCountdown manually')

  await new Promise(res => setTimeout(() => {
    res(true)
  }, 3000))

  startCountdown()
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
          <WSMSInput v-model:value="state.input1" clearable placeholder="default 60s" />

          <WSMSInput v-model:value="state.input2" clearable placeholder="custom 30s" :retry-seconds="30" />

          <WSMSInput
            v-model:value="state.input3"
            clearable
            placeholder="simple-verify"
            simple-verify
            @verify-success="onSuccess"
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Before Countdown Support
        </WTitle>

        <n-space vertical>
          <WSMSInput v-model:value="state.input4" clearable placeholder="before count down" :on-before-countdown="onBeforeCountdown" />
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
