<template>
  <el-card>
    <template #header>
      <span>Select：</span>
    </template>

    <w-title show-left>Base 【{{ select1 }}】 </w-title>
    <w-select v-model="select1" :options="options" value-type="number" />

    <br />
    <br />

    <w-title show-left>Object modelValue 【{{ select2 }}】 </w-title>
    <w-select
      v-model="select2"
      :options="options"
      value-key="value"
      value-type="number"
    />

    <br />
    <br />

    <w-title show-left>Multiple 【{{ select3 }}】 </w-title>
    <w-select
      v-model="select3"
      multiple
      :options="options"
      value-type="number"
    />

    <br />
    <br />

    <w-title show-left>Multiple Object 【{{ select4 }}】 </w-title>
    <w-select
      v-model="select4"
      multiple
      :options="options"
      value-key="value"
      value-type="number"
      block
    />

    <br />
    <br />
  </el-card>
</template>

<script lang="ts">
  import { toRefs, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'SelectDemo',

    setup() {
      const state = reactive({
        select1: '1',
        select2: { value: '6', label: 'label-6' },
        select3: ['1', '2'],
        select4: [
          { value: '1', label: 'label-1' },
          { value: '2', label: 'label-2' },
        ],
        select5: '1,3',
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
        ...toRefs(state),
        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
