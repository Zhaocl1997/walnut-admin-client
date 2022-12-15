<script lang="ts" setup>
import { options } from '../data'

const state = reactive({
  checkbox1: [],
  checkbox2: [1, 4],
  checkbox3: ['1', '4'],
  checkbox4: '',
  checkbox5: '1,4',
  checkbox6: '1,3,4,5',
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'CheckboxDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Checkbox">
    <W-JSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="string/number will all feedback correctly"
        >
          Basic usage
        </w-title>

        <n-space vertical>
          <w-checkbox
            v-model:value="state.checkbox1"
            :options="options"
            value-type="number"
            multiple
          />

          <w-checkbox
            v-model:value="state.checkbox2"
            :options="options"
            value-type="number"
            multiple
          />

          <w-checkbox
            v-model:value="state.checkbox3"
            :options="options"
            value-type="number"
            multiple
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title
          prefix="bar"
          help-message="provide a `value-separator` prop to use checkbox with a string value"
        >
          String v-model:value
        </w-title>

        <n-space vertical>
          <w-checkbox
            v-model:value="state.checkbox4"
            :options="options"
            value-type="number"
            value-separator=","
            multiple
          />

          <w-checkbox
            v-model:value="state.checkbox5"
            :options="options"
            value-type="number"
            value-separator=","
            multiple
          />

          <w-checkbox
            v-model:value="state.checkbox6"
            :options="options"
            value-type="number"
            value-separator=","
            multiple
          />
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
