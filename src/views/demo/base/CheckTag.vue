<template>
  <el-card>
    <template #header>
      <span>CheckTag：</span>
    </template>

    <w-title show-left>Single 【{{ checkTag1 }}】 </w-title>
    <w-check-tag v-model="checkTag1" :options="options" />

    <br />
    <br />

    <w-title show-left>Multiple 【{{ checkTag2 }}】 </w-title>
    <w-check-tag v-model="checkTag2" :options="options" multiple />

    <br />
    <br />

    <w-title show-left>Single Feedback 【{{ checkTag3 }}】 </w-title>
    <w-check-tag v-model="checkTag3" :options="options" />

    <br />
    <br />

    <w-title show-left>Multiple Feedback 【{{ checkTag4 }}】 </w-title>
    <w-check-tag v-model="checkTag4" :options="options" multiple />

    <br />
    <br />
  </el-card>
</template>

<script lang="ts">
  import { reactive, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'CheckTagDemo',

    setup() {
      const state = reactive({
        checkTag1: '',
        checkTag2: '',
        checkTag3: '1',
        checkTag4: ['1', '2'],
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
