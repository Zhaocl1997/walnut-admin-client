import type { WFormSchemaItem } from '/@/components/UI/Form'

import { reactive, computed } from 'vue'
import { generateBaseWFormRules } from '/@/components/UI/Form'
import { options, TreeData } from '../data'

export const useFormConfig = (fns: any) => {
  const formConfig = reactive({
    disabled: false,
    inline: false,
    labelPosition: 'right',
    size: 'medium',
    vIf: true,
    vShow: true,
    labelWidth: '120px',
  })

  const formConfigSchemas: WFormSchemaItem[] = [
    {
      type: 'Radio',
      formProp: {
        label: 'Disabled',
        prop: 'disabled',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: false,
            label: 'Normal',
          },
          {
            value: true,
            label: 'Disabled',
          },
        ],
      },
    },
    {
      type: 'Radio',
      formProp: {
        label: 'Inline',
        prop: 'inline',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: false,
            label: 'Normal',
          },
          {
            value: true,
            label: 'Inline',
          },
        ],
      },
    },
    {
      type: 'Radio',
      formProp: {
        label: 'Label Position',
        prop: 'labelPosition',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: 'left',
            label: 'Left',
          },
          {
            value: 'right',
            label: 'Right',
          },
          {
            value: 'top',
            label: 'Top',
          },
        ],
      },
    },
    {
      type: 'Radio',
      formProp: {
        label: 'Size',
        prop: 'size',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: 'medium',
            label: 'Medium',
          },
          {
            value: 'small',
            label: 'Small',
          },
          {
            value: 'mini',
            label: 'Mini',
          },
        ],
      },
    },
    {
      type: 'Radio',
      formProp: {
        label: 'v-if',
        prop: 'vIf',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: true,
            label: 'Display',
          },
          {
            value: false,
            label: 'Invisible',
          },
        ],
      },
    },
    {
      type: 'Radio',
      formProp: {
        label: 'v-show',
        prop: 'vShow',
      },
      componentProp: {
        button: true,
        options: [
          {
            value: true,
            label: 'Display',
          },
          {
            value: false,
            label: 'Invisible',
          },
        ],
      },
    },
  ]

  const demoFormData = reactive({
    // need to init an empty array when multiple true
    baseFormCheckbox: [],
  })

  const demoFormSchemas = computed((): WFormSchemaItem[] => {
    return [
      {
        type: 'Button',
        formProp: {
          label: 'Button',
        },
        componentProp: {
          text: 'Button',
          icon: 'el-icon-question',
          suffixIcon: 'el-icon-question',
          onClick: () => {
            console.log('Clicked Button')
          },
        },
        vIf: computed(() => formConfig.vIf),
        vShow: computed(() => formConfig.vShow),
      },
      {
        type: 'ButtonGroup',
        formProp: {
          label: 'ButtonGroup',
        },
        componentProp: {
          groups: [
            {
              text: 'Button 1',
              type: 'primary',
              onClick: () => {
                console.log('Clicked Button 1')
              },
            },
            {
              text: 'Button 2',
              type: 'success',
              onClick: () => {
                console.log('Clicked Button 2')
              },
            },
            {
              text: 'Button 3',
              type: 'warning',
              onClick: () => {
                console.log('Clicked Button 3')
              },
            },
          ],
        },
        vIf: ({ formData }) => {
          return formData.baseFormInput
        },
        vShow: ({ formData }) => {
          return formData.baseFormInputNumber
        },
      },
      {
        type: 'Input',
        formProp: {
          prop: 'baseFormInput',
          label: 'Input',
        },
        componentProp: {
          clearable: true,
          helpPosition: 'suffix',
          helpMessage: 'Some tips',
          modelModifiers: {
            trim: true,
          },
        },
      },
      {
        type: 'InputNumber',
        formProp: {
          prop: 'baseFormInputNumber',
          label: 'InputNumber',
        },
        componentProp: {
          min: 10,
          max: 20,
          step: 2,
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
          options,
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
          options,
        },
      },
      {
        type: 'Radio',
        formProp: {
          prop: 'baseFormRadio',
          label: 'Radio',
        },
        componentProp: {
          button: true,
          options,
        },
      },
      {
        type: 'Tree',
        formProp: {
          prop: 'baseFormTree',
          label: 'Tree',
        },
        componentProp: {
          data: TreeData,
          defaultExpandAll: true,
          props: {
            id: '_id',
            disabled: '_disabled',
          },
          class: 'border-2',
          style: {
            height: '200px',
            overflowY: 'scroll',
          },
        },
      },
      {
        type: 'SelectTree',
        formProp: {
          prop: 'baseFormSelectTree',
          label: 'SelectTree',
        },
        componentProp: {
          clearable: true,
          data: TreeData,
          props: {
            id: '_id',
            disabled: '_disabled',
          },
        },
      },
      {
        type: 'ButtonGroup',
        formProp: {
          label: 'Methods',
        },
        componentProp: {
          groups: [
            {
              text: 'Validate',
              onClick: fns.validate,
            },
            {
              text: 'ValidateField(Input)',
              onClick: fns.validateField,
            },
            {
              text: 'ClearValidate',
              onClick: fns.clearValidate,
            },
            {
              text: 'ClearValidate(Input)',
              onClick: fns.clearValidateInput,
            },
            {
              text: 'ResetFields',
              onClick: fns.resetFields,
            },
          ],
        },
      },
      {
        type: 'Slot',
        formProp: {
          label: 'Slot render',
          prop: 'baseFormSlot',
        },
      },
      {
        type: 'Render',
        formProp: {
          label: 'JSX render',
          prop: 'baseFormJSX',
        },
        render: ({ formData }) => {
          return (
            <el-input
              v-model={formData.baseFormJSX}
              placeholder="JSX render El-input"
            ></el-input>
          )
        },
      },
    ]
  })

  const { rules: demoFormRules } = generateBaseWFormRules(demoFormSchemas)

  return {
    formConfig,
    formConfigSchemas,
    demoFormData,
    demoFormSchemas,
    demoFormRules,
  }
}
