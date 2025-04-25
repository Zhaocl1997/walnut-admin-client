<script lang="ts" setup>
defineOptions({
  name: 'DynamicInputForm',
})

const configData = ref({})

const [register1] = useForm<typeof configData.value>({
  span: 12,
  labelWidth: 100,
  schemas: [],
})

const formData = ref({})

const [register2] = useForm({
  span: 24,
  schemas: [
    {
      type: 'Raw:DynamicInput',
      formProp: {
        path: 'dynamic1',
        label: 'Base Dynamic',
      },
      componentProp: {},
    },
    {
      type: 'Raw:DynamicInput',
      formProp: {
        path: 'dynamic2',
        label: 'Pair Key/Value',
      },
      componentProp: {
        preset: 'pair',
      },
    },
  ],
})
</script>

<template>
  <WDemoCard title="Dynamic Input Form" description="Dynamic Input Form.">
    <w-form :model="configData" @hook="register1" />

    <WJSON :value="formData" />

    <w-form :model="formData" @hook="register2" />
  </WDemoCard>
</template>

<style lang="scss" scoped></style>
