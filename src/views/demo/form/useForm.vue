<script lang="ts" setup>
defineOptions({
  name: 'UseForm',
})

const desc = ref(false)
const formData = ref({
  input1: '11',
  input2: '22',
  input3: '33',
  input4: '44',
  input5: '55',
  input6: '66',
})

const [register, { validate, restoreValidation }] = useForm({
  span: 8,
  labelWidth: 100,
  useDescription: desc,
  descriptionProps: {
    labelPlacement: 'left',
    bordered: true,
    column: 3,
    // TODO bug
    // column not working
  },
  schemas: [
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 1',
        path: 'input1',
        rule: {
          required: true,
        },
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 2',
        path: 'input2',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 3',
        path: 'input3',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 4',
        path: 'input4',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 5',
        path: 'input5',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Input 6',
        path: 'input6',
      },
    },
    {
      type: 'Base:ButtonGroup',
      formProp: {
        label: 'Methods',
      },
      componentProp: {
        groups: [
          {
            textProp: 'Validate',
            onClick: async () => {
              const ret = await validate!()
              console.log('validate', ret)
            },
          },
          {
            textProp: 'Clear Validation',
            onClick: async () => {
              await restoreValidation!()
            },
          },
        ],
      },
    },
  ],
})
</script>

<template>
  <w-demo-card title="useForm">
    <w-JSON :value="formData" />

    <n-switch v-model:value="desc">
      <template #checked>
        normal form
      </template>
      <template #unchecked>
        description
      </template>
    </n-switch>

    <br>
    <br>

    <w-form :model="formData" @hook="register" />
  </w-demo-card>
</template>

<style lang="scss" scoped></style>
