<template>
  <el-card>
    <template #header>
      <span>useForm hook：</span>

      <WJson :value="useFormData"></WJson>
    </template>

    <w-form v-model="useFormData" @hook="register"></w-form>
  </el-card>
</template>

<script lang="ts">
  import type { WFormRule, WFormSchemaItem } from '/@/components/UI/Form'
  import { useForm } from '/@/components/UI/Form'
  import { ref, reactive, defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'UseFormDemo',

    setup() {
      const useFormData = reactive({
        // need to init an empty array when multiple true
        baseFormCheckbox: [],
      })

      const useFormSchemas = computed((): WFormSchemaItem[] => {
        return [
          {
            type: 'Input',
            formProp: {
              prop: 'baseFormInput',
              label: 'Input',
            },
            componentProp: {
              clearable: true,
            },
          },
          {
            type: 'Select',
            formProp: {
              prop: 'baseFormSelect',
              label: 'Select',
            },
            componentProp: {
              clearable: true,
              options: [
                {
                  value: '1',
                  label: 'label-1',
                },
                {
                  value: '2',
                  label: 'label-2',
                },
                {
                  value: '3',
                  label: 'label-3',
                },
              ],
            },
          },
          {
            type: 'Checkbox',
            formProp: {
              prop: 'baseFormCheckbox',
              label: 'Checkbox',
            },
            componentProp: {
              multiple: true,
              options: [
                {
                  value: '1',
                  label: 'label-1',
                },
                {
                  value: '2',
                  label: 'label-2',
                },
                {
                  value: '3',
                  label: 'label-3',
                },
              ],
            },
          },
          {
            type: 'ButtonGroup',
            formProp: {
              prop: 'baseFormMethods',
              label: 'Methods',
            },
            componentProp: {
              groups: [
                {
                  text: 'Validate',
                  onClick: async () => {
                    const valid = await validate()
                    console.log('[Validate]', valid)
                  },
                },
                {
                  text: 'ValidateField(Input)',
                  onClick: async () => {
                    const msg = await validateField('baseFormInput')
                    console.log('[ValidateField]', msg)
                  },
                },
                {
                  text: 'ClearValidate',
                  onClick: () => {
                    clearValidate()
                  },
                },
                {
                  text: 'ClearValidate(Input)',
                  onClick: () => {
                    clearValidate('baseFormInput')
                  },
                },
                {
                  text: 'ResetFields',
                  onClick: () => {
                    resetFields()
                  },
                },
              ],
            },
          },
        ]
      })

      const useFormRules: WFormRule = {
        baseFormInput: [
          {
            required: true,
            message: 'Please input something!',
            trigger: 'blur',
          },
        ],
        baseFormSelect: [
          {
            required: true,
            message: 'Please select One!',
            trigger: 'change',
          },
        ],
        baseFormCheckbox: [
          {
            required: true,
            message: 'Please choose one or more!',
            trigger: 'change',
          },
        ],
      }

      const [
        register,
        { validate, validateField, resetFields, clearValidate },
      ] = useForm({
        schemas: useFormSchemas,
        rules: useFormRules,
      })

      return {
        register,
        useFormData,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
