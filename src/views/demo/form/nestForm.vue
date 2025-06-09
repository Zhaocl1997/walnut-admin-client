<script lang="ts" setup>
defineOptions({
  name: 'NestForm',
  defaultView: false,
})

const formData = ref<Recordable>({
  'nested[0].input1': '1',
  'nested[1].input2': '2',
  'nested.input[0].[1]': '3',
  'nested.input[0].[2]': '4',
  'a.b.c.input1': '5',
  'a.b.c.input2': '6',
})

const [register] = useForm<typeof formData.value>({
  labelWidth: 80,
  schemas: [
    ...Array.from({ length: 2 }, (v, k) => {
      return {
        type: 'Base:Input',
        formProp: {
          label: `Input ${k + 1}`,
          path: `nested[${k}].input${k + 1}`,
          rule: {
            required: true,
            trigger: 'change',
          },
        },
      }
    }),
    ...Array.from({ length: 2 }, (v, k) => {
      return {
        type: 'Base:Input',
        formProp: {
          label: `Input ${k + 1}`,
          path: `nested.input[0].[${k + 1}]`,
          rule: {
            required: true,
            trigger: 'change',
          },
        },
      }
    }),
    ...Array.from({ length: 2 }, (v, k) => {
      return {
        type: 'Base:Input',
        formProp: {
          label: `Input ${k + 1}`,
          path: `a.b.c.input${k + 1}`,
          rule: {
            required: true,
            trigger: 'change',
          },
        },
      }
    }),
  ],
})
</script>

<template>
  <WDemoCard title="Nest Fields Form" description="common used in daily">
    <WJSON :value="formData" height="200px" />

    <WForm :model="formData" @hook="register" />
  </WDemoCard>
</template>
