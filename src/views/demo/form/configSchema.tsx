import type { WForm } from '/@/components/UI/Form'

import { reactive, computed } from 'vue'
import { generateBaseWFormRules } from '/@/components/UI/Form'
import { options, getTreeData } from '../data'

export const useFormConfig = (fns: any) => {
  // config form data
  const formConfig = reactive({
    labelWidth: '120px',
    disabled: false,
    inline: false,
    labelPosition: 'right' as WForm.ElForm.LabelPosition,
    size: 'medium' as ComponentSize,
    compact: false,
    vIf: true,
    vShow: true,
  })

  // config form schema
  const formConfigSchemas: WForm.Schema.Item[] = [
    {
      type: 'Switch',
      formProp: {
        label: 'Disabled',
        prop: 'disabled',
      },
    },
    {
      type: 'Switch',
      formProp: {
        label: 'Inline',
        prop: 'inline',
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
        size: 'small',
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
        size: 'small',
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
      type: 'Switch',
      formProp: {
        label: 'Compact',
        prop: 'compact',
      },
    },
    {
      type: 'Switch',
      formProp: {
        label: 'v-if',
        prop: 'vIf',
      },
    },
    {
      type: 'Switch',
      formProp: {
        label: 'v-show',
        prop: 'vShow',
      },
    },
  ]

  const demoFormData = reactive<any>({
    // need to init an empty array when multiple true
    baseFormCheckbox: [],
  })

  const demoFormSchemas = computed((): WForm.Schema.Item[] => {
    return [
      {
        type: 'Divider',
        componentProp: {
          title: 'Divider 1',
          fold: true,
          countToFold: 3,
          children: [
            {
              type: 'Input',
              formProp: {
                prop: 'DividerInput1',
                label: 'Divider Input1',
              },
              colProp: {
                span: 12,
              },
            },
            {
              type: 'Input',
              formProp: {
                prop: 'DividerInput2',
                label: 'Divider Input2',
              },
              colProp: {
                span: 12,
              },
            },
            {
              type: 'Input',
              formProp: {
                prop: 'DividerInput3',
                label: 'Divider Input3',
              },
            },
            {
              type: 'Input',
              formProp: {
                prop: 'DividerInput4',
                label: 'Divider Input4',
              },
              colProp: {
                span: 12,
              },
            },
            {
              type: 'Input',
              formProp: {
                prop: 'DividerInput5',
                label: 'Divider Input5',
              },
              colProp: {
                span: 12,
              },
            },
          ],
        },
      },
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
        vIf: computed(() => formConfig.vIf),
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
        vShow: computed(() => formConfig.vShow),
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
          data: getTreeData(),
          defaultExpandAll: true,
          props: {
            id: '_id',
            label: '_label',
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
          data: getTreeData(),
          props: {
            id: '_id',
            label: '_label',
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
