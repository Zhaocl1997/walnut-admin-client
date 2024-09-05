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
      type: 'Base:DynamicInput',
      formProp: {
        path: 'dynamic1',
        label: 'Base Dynamic',
      },
      componentProp: {},
    },
    {
      type: 'Base:DynamicInput',
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
  <w-demo-card title="Dynamic Input Form" description="Dynamic Input Form.">
    <w-form :model="configData" @hook="register1" />

    <w-JSON :value="formData" />

    <w-form :model="formData" @hook="register2" />
  </w-demo-card>
</template>

<style lang="scss" scoped></style>
