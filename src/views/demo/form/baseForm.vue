<template>
  <w-demo-card
    title="Base Form"
    description="Display all support types in schemas."
  >
    <w-JSON :value="formData"></w-JSON>

    <w-form
      ref="formRef"
      :model="formData"
      :schemas="schemas"
      label-width="120px"
      base-rules
    >
      <template #formSlot>
        <n-input v-model:value="formData.formSlot"></n-input>
      </template>
    </w-form>
  </w-demo-card>
</template>

<script lang="tsx">
  import type { WForm } from '/@/components/UI/Form'

  import { getTreeData, options } from '../data'

  export default defineComponent({
    name: 'BaseForm',

    setup() {
      const formRef = ref<WForm.Inst.WFormInst>()

      const { stateRef: formData, resetState: resetFormData } = useState({
        formInput: null,
        formInputNumber: 3,
        formSelect: null,
        formRadio: null,
        formCheckbox: null,
        formSwitch: true,
        formTimePicker: null,
        formDatePicker: null,
        formDynamicTags: [],
        formDynamicInput: [],
        formSlider: 10,
        formTree: null,
        formTreeSelect: null,
        formSlot: null,
        formRender: null,
        formIconPicker: null,
        formTransitionPicker: null,
        formRoleSelect: null,
        formAreaCascader: null,
        formTinymce: null,
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
                      if (valid) {
                        useAppMessage().success('Success')
                      } else {
                        useAppMessage().error('Error')
                      }
                    },
                  },
                  {
                    textProp: 'Clear Validation',
                    onClick: () => {
                      formRef.value?.restoreValidation()
                    },
                  },
                  {
                    textProp: 'Reset Form Data',
                    onClick: () => {
                      resetFormData()
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
              },
              componentProp: {
                options: options,
                valueType: 'number',
              },
            },
            {
              type: 'Base:Radio',
              formProp: {
                label: 'Radio',
                path: 'formRadio',
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
                first: true,
              },
              componentProp: {},
            },
            {
              type: 'Base:TimePicker',
              formProp: {
                label: 'TimePicker',
                path: 'formTimePicker',
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
                ruleType: 'array',
              },
              componentProp: {
                round: true,
              },
            },
            {
              type: 'Base:DynamicInput',
              formProp: {
                label: 'Dynamic Input',
                path: 'formDynamicInput',
                ruleType: 'array',
              },
              componentProp: {
                preset: 'pair',
                showSortButton: true,
                min: 1,
              },
            },
            {
              type: 'Base:Slider',
              formProp: {
                label: 'Slider',
                path: 'formSlider',
              },
              componentProp: {
                max: 24,
                min: 10,
              },
            },
            {
              type: 'Base:Tree',
              formProp: {
                label: 'Tree',
                path: 'formTree',
              },
              componentProp: {
                // TODO emit value do not trigger reset validation status
                treeProps: {
                  data: getTreeData(),
                  labelField: '_label',
                  keyField: '_id',
                  blockLine: true,
                  blockNode: true,
                },
              },
            },
            {
              type: 'Base:TreeSelect',
              formProp: {
                label: 'TreeSelect',
                path: 'formTreeSelect',
              },
              componentProp: {
                options: getTreeData(),
                labelField: '_label',
                keyField: '_id',
                clearable: true,
              },
            },
            {
              type: 'Base:Slot',
              formProp: {
                label: 'Slot',
                path: 'formSlot',
              },
            },
            {
              type: 'Base:Render',
              formProp: {
                label: 'Render',
                path: 'formRender',
              },
              componentProp: {
                render: ({ formData }) => (
                  <n-input vModel={[formData.formRender, 'value']}></n-input>
                ),
              },
            },
            {
              type: 'Extend:IconPicker',
              formProp: {
                label: 'Icon Picker',
                path: 'formIconPicker',
              },
            },
            {
              type: 'Extend:TransitionSelect',
              formProp: {
                label: 'Transition Select',
                path: 'formTransitionPicker',
              },
            },
            {
              type: 'Extend:RoleSelect',
              formProp: {
                label: 'Role Select',
                path: 'formRoleSelect',
              },
            },
            {
              type: 'Extend:AreaCascader',
              formProp: {
                label: 'Area Cascader',
                path: 'formAreaCascader',
              },
            },
            {
              type: 'Vendor:Tinymce',
              formProp: {
                // TODO emit value do not trigger reset validation status
                label: 'Tinymce',
                path: 'formTinymce',
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
