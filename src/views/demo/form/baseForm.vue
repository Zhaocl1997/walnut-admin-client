<template>
  <w-demo-card
    title="Base Form"
    description="Simply display all BASE kind in schemas."
  >
    <w-JSON :value="formData"></w-JSON>

    <w-form
      ref="formRef"
      :model="formData"
      :schemas="schemas"
      label-width="120px"
    >
      <template #formSlot>
        <n-input v-model:value="formData.formSlot"></n-input>
      </template>
    </w-form>
  </w-demo-card>
</template>

<script lang="tsx">
  import type { WForm } from '/@/components/UI/Form'

  import { options } from '../data'

  export default defineComponent({
    name: 'BaseForm',

    setup() {
      const formRef = ref<WForm.Inst.WFormInst>()

      const formData = ref({
        formInput: undefined,
        formInputNumber: undefined,
        formSelect: undefined,
        formRadio: undefined,
        formCheckbox: undefined,
        formSwitch: undefined,
        formTimePicker: undefined,
        formDatePicker: undefined,
        formDynamicTags: undefined,
        formSlider: undefined,
        formSlot: undefined,
        formRender: undefined,
      })

      const schemas = computed(
        (): WForm.Schema.Item<typeof formData.value>[] => {
          return [
            {
              type: 'Base:Button',
              formProp: {
                label: 'Button',
              },
              componentProp: {
                textProp: 'Single Button',
                onClick: () => {
                  console.log('single button')
                },
              },
            },
            {
              type: 'Base:ButtonGroup',
              formProp: {
                label: 'Button Group',
              },
              componentProp: {
                groups: [
                  {
                    textProp: 'Validate',
                    onClick: async () => {
                      const valid = await formRef.value?.validate()
                      console.log(valid)
                    },
                  },
                  {
                    textProp: 'Clear Validation',
                    onClick: () => {
                      formRef.value?.restoreValidation()
                    },
                  },
                ],
              },
              gridProp: {
                span: 24,
              },
            },

            {
              type: 'Base:Input',
              formProp: {
                label: 'Input',
                path: 'formInput',
                rule: [
                  {
                    required: true,
                    message: 'Invalid!',
                    trigger: ['input', 'blur'],
                  },
                ],
                labelHelpMessage: [
                  '1. Set `whitespace` in `formProp` true, it will treat whitespace as invalid input.',
                  '2. Set `trim` in `componentProp.valueModifiers` true, it will force to disable input whitespace.',
                ],
              },
              componentProp: {
                type: 'textarea',
                showCount: true,
                maxlength: 100,
              },
            },
            {
              type: 'Base:InputNumber',
              formProp: {
                label: 'InputNumber',
                path: 'formInputNumber',
                rule: [
                  {
                    type: 'number',
                    min: 3,
                    max: 10,
                    required: true,
                    message: 'Invalid!',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                min: 3,
                max: 10,
              },
            },
            {
              type: 'Base:Select',
              formProp: {
                label: 'Select',
                path: 'formSelect',
                rule: [
                  {
                    type: 'number',
                    required: true,
                    message: 'Invalid!',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                options: options,
              },
            },
            {
              type: 'Base:Radio',
              formProp: {
                label: 'Radio',
                path: 'formRadio',
                rule: [
                  {
                    type: 'number',
                    required: true,
                    message: 'Invalid!',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                options: options,
              },
            },
            {
              type: 'Base:Checkbox',
              formProp: {
                label: 'Checkbox',
                path: 'formCheckbox',
                rule: [
                  {
                    required: true,
                    message: 'Invalid!',
                    type: 'array',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                options: options,
              },
            },
            {
              type: 'Base:Switch',
              formProp: {
                label: 'Switch',
                path: 'formSwitch',
                rule: [
                  {
                    type: 'boolean',
                    required: true,
                    trigger: ['change'],
                    message: 'Invalid!',
                  },
                ],
                first: true,
              },
              componentProp: {},
            },
            {
              type: 'Base:TimePicker',
              formProp: {
                label: 'TimePicker',
                path: 'formTimePicker',
                rule: [
                  {
                    type: 'number',
                    required: true,
                    trigger: ['blur', 'change'],
                    message: 'Invalid!',
                  },
                ],
              },
              componentProp: {
                format: 'HH:mm:ss',
              },
            },
            {
              type: 'Base:DatePicker',
              formProp: {
                label: 'DatePicker',
                path: 'formDatePicker',
                rule: [
                  {
                    type: 'number',
                    required: true,
                    trigger: ['blur', 'change'],
                    message: 'Invalid!',
                  },
                ],
              },
              componentProp: {
                type: 'datetime',
              },
            },
            {
              type: 'Base:DynamicTags',
              formProp: {
                label: 'DynamicTags',
                path: 'formDynamicTags',
                rule: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Invalid!',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                round: true,
              },
            },
            {
              type: 'Base:Slider',
              formProp: {
                label: 'Slider',
                path: 'formSlider',
                rule: [
                  {
                    type: 'number',
                    required: true,
                    message: 'Invalid!',
                    trigger: ['change'],
                  },
                ],
              },
              componentProp: {
                max: 24,
                min: 10,
              },
            },
            {
              type: 'Base:Slot',
              formProp: {
                label: 'Slot',
                path: 'formSlot',
                rule: [
                  {
                    required: true,
                    message: 'Invalid!',
                    trigger: ['input', 'blur'],
                  },
                ],
              },
            },
            {
              type: 'Base:Render',
              formProp: {
                label: 'Render',
                path: 'formRender',
                rule: [
                  {
                    required: true,
                    message: 'Invalid!',
                    trigger: ['input', 'blur'],
                  },
                ],
              },
              componentProp: {
                render: ({ formData }) => (
                  <n-input vModel={[formData.formRender, 'value']}></n-input>
                ),
              },
            },
          ]
        }
      )

      return {
        formRef,
        formData,
        schemas,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
