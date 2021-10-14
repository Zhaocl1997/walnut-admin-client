<template>
  <w-demo-card title="Checkbox">
    <!-- <w-title show-left>Base 【{{ checkbox1 }}】【{{ checkbox3 }}】 </w-title>
    <w-checkbox v-model="checkbox1"> Some text (slot) </w-checkbox>
    <w-checkbox v-model="checkbox3" text="Some text (prop)"> </w-checkbox>

    <br />
    <br />

    <w-title show-left>Multiple 【{{ checkbox2 }}】 </w-title>
    <w-checkbox v-model="checkbox2" :options="options" multiple />

    <br />
    <br /> -->
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'CheckboxDemo',

    setup() {
      const state = reactive({
        checkbox1: false,
        checkbox2: ['1', '4'],
        checkbox3: false,
        checkbox4: '',
        checkbox5: '',
        checkbox6: '',
        checkbox7: '',
        checkbox8: '',
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
