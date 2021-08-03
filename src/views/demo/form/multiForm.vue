<template>
  <w-demo-card title="Dynamic Input Form" description="Dynamic Input Form.">
    <w-form-new @hook="register1" :model="configData"></w-form-new>

    <w-json :value="formData"></w-json>

    <w-form-new @hook="register2" :model="formData"></w-form-new>
  </w-demo-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import WFormNew, { useForm } from '/@/components/UINew/Form'

  export default defineComponent({
    name: 'DynamicInputForm',

    components: { WFormNew },

    setup() {
      const configData = ref({})

      const [register1] = useForm<typeof configData.value>({
        span: 12,
        xGap: 20,
        labelWidth: 100,
        schemas: [],
      })

      const formData = ref({})

      const [register2] = useForm({
        span: 24,
        xGap: 20,
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

      return {
        configData,
        register1,
        formData,
        register2,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
