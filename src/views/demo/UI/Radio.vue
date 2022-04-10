<template>
  <w-demo-card title="Radio">
    <W-JSON :value="state" height="300px"></W-JSON>

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
          ></w-radio>

          <w-radio
            v-model:value="state.radio2"
            :options="options"
            value-type="number"
          ></w-radio>

          <w-radio
            v-model:value="state.radio3"
            :options="options"
            value-type="number"
          ></w-radio>

          <w-radio
            v-model:value="state.radio4"
            :options="options"
            value-type="number"
          ></w-radio>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import { options } from '../data'

  const state = reactive({
    radio1: '',
    radio2: '1',
    radio3: '4',
    radio4: 4,
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'RadioDemo',

    defaultView: false,
  })
</script>
