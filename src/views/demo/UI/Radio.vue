<script lang="ts" setup>
import { options } from '../data'

defineOptions({
  name: 'RadioDemo',
  defaultView: false,
})

const state = reactive({
  radio1: undefined,
  radio2: 1,
  radio3: undefined,
})
</script>

<template>
  <WDemoCard title="Radio">
    <W-JSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="string/number will all feedback correctly"
        >
          Basic usage
        </WTitle>

        <n-space vertical>
          <WRadio
            v-model:value="state.radio1"
            :options="options"
          />

          <WRadio
            v-model:value="state.radio2"
            :options="options"
            size="large"
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar">
          Button Radio
        </WTitle>

        <WRadio
          v-model:value="state.radio3"
          :options="options"
          button
        />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
