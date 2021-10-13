<template>
  <w-demo-card title="Select">
    <W-JSON :value="state" height="400px"></W-JSON>

    <n-space vertical>
      <w-select
        v-model:value="state.select1"
        :options="options"
        clearable
      ></w-select>

      <w-select
        v-model:value="state.select2"
        :options="options"
        clearable
      ></w-select>

      <w-select
        v-model:value="state.select3"
        :options="options"
        clearable
        multiple
      ></w-select>

      <w-select
        v-model:value="state.select4"
        :options="options"
        clearable
        multiple
      ></w-select>

      <w-select
        v-model:value="state.select5"
        :options="options"
        clearable
        multiple
        value-separator=","
      ></w-select>
    </n-space>
  </w-demo-card>
</template>

<script lang="ts">
  import { reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'SelectDemo',

    setup() {
      const state = reactive<any>({
        select1: '1',
        select2: 1,
        select3: ['1', '3', '5'],
        select4: [1, 3, 5],
        select5: '2,4,6',
      })

      const options = []

      for (let i = 0; i < 100; i++) {
        options.push({
          value: `${i + 1}`,
          label: `label-${i + 1}`,
        })
      }

      options.push({
        value: 999,
        label:
          'label-999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
      })

      return {
        state,
        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
