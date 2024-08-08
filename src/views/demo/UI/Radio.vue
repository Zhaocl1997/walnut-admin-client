<script lang="ts" setup>
import { options } from '../data'

defineOptions({
  name: 'RadioDemo',
  defaultView: false,
})

const state = reactive({
  radio1: '',
  radio2: '1',
  radio3: '4',
  radio4: 4,
  radio5: null,
})
</script>

<template>
  <w-demo-card title="Radio">
    <W-JSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="string/number will all feedback correctly"
        >
          Basic usage
        </w-title>

        <n-space vertical>
          <w-radio
            v-model:value="state.radio1"
            :options="options"
            value-type="number"
          />

          <w-radio
            v-model:value="state.radio2"
            :options="options"
            value-type="number"
          />

          <w-radio
            v-model:value="state.radio3"
            :options="options"
            value-type="number"
          />

          <w-radio
            v-model:value="state.radio4"
            :options="options"
            value-type="number"
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Button Radio
        </w-title>

        <w-radio
          v-model:value="state.radio5"
          :options="options"
          value-type="number"
          button
        />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
