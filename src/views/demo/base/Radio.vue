<template>
  <el-card>
    <template #header>
      <span>Radio：</span>
    </template>

    <w-title show-left>Base 【{{ radio1 }}】</w-title>
    <w-radio v-model="radio1" :options="options"></w-radio>

    <br />
    <br />

    <w-title show-left>Button Styled 【{{ radio2 }}】</w-title>
    <w-radio v-model="radio2" :options="options" button></w-radio>

    <br />
    <br />

    <w-title show-left>Border Styled 【{{ radio3 }}】</w-title>
    <w-radio v-model="radio3" :options="options" border></w-radio>

    <br />
    <br />

    <w-title show-left>Feedback 【{{ radio4 }}】</w-title>
    <w-radio v-model="radio4" :options="options"></w-radio>
  </el-card>
</template>

<script lang="ts">
  import { reactive, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'RadioDemo',

    setup() {
      const state = reactive({
        radio1: '',
        radio2: '',
        radio3: '',
        radio4: '5',
      })

      const options = [
        {
          value: '1',
          label: 'Beijing',
        },
        {
          value: '2',
          label: 'New York City',
          disabled: true,
        },
        {
          value: '3',
          label: 'Paris',
        },
        {
          value: '4',
          label: 'Tokyo',
        },
        {
          value: '5',
          label: 'London',
        },
      ]

      return {
        ...toRefs(state),
        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
