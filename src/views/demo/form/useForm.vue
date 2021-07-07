<template>
  <w-demo-card title="useForm">
    <w-json :value="formData"></w-json>

    <w-form-new @hook="register" :model="formData"></w-form-new>
  </w-demo-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import WFormNew from '/@/components/UINew/Form'
  import { useForm } from '/@/components/UINew/Form'

  export default defineComponent({
    name: 'UseForm',

    components: { WFormNew },

    setup() {
      const formData = ref({})

      const [register, { validate, restoreValidation }] = useForm({
        span: 8,
        labelWidth: 100,
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

      return {
        formData,
        register,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
