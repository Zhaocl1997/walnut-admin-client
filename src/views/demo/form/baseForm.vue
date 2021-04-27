<template>
  <el-card>
    <template #header>
      <span>Base form：</span>

      <w-json :value="baseFormData"></w-json>
      <el-slider v-model="value1" :max="24" :min="0"></el-slider>
    </template>

    <w-form
      ref="wFormRef"
      v-model="baseFormData"
      :schemas="baseFormSchemas"
      :rules="rules"
      :span="value1"
    >
      <template #baseFormSlot="{ disabled }">
        <input
          type="text"
          class="h-12 border-2 block"
          @input="(e) => (baseFormData.baseFormSlot = e.target.value)"
          :disabled="disabled"
        />
      </template>
    </w-form>
  </el-card>
</template>

<script lang="ts">
  import type { WFormMethods, WFormSchemaItem } from '/@/components/UI/Form'
  import { ref, reactive, defineComponent, computed } from 'vue'
  import { options, TreeData } from '../data'

  import { generateBaseWFormRules } from '/@/components/UI/Form'

  export default defineComponent({
    name: 'BaseFormDemo',

    setup() {
      const value1 = ref(24)
      const wFormRef = ref<Nullable<WFormMethods>>(null)
      const baseFormData = reactive({
        // need to init an empty array when multiple true
        baseFormCheckbox: [],
      })

      const baseFormSchemas = computed((): WFormSchemaItem[] => {
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
            type: 'Input',
            formProp: {
              prop: 'baseFormSlot',
              label: 'Slot',
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
                  onClick: async () => {
                    const valid = await wFormRef.value?.validate()
                    console.log('[Validate]', valid)
                  },
                },
                {
                  text: 'ValidateField(Input)',
                  onClick: async () => {
                    const msg = await wFormRef.value?.validateField(
                      'baseFormInput'
                    )
                    console.log('[ValidateField]', msg)
                  },
                },
                {
                  text: 'ClearValidate',
                  onClick: async () => {
                    await wFormRef.value?.clearValidate()
                  },
                },
                {
                  text: 'ClearValidate(Input)',
                  onClick: async () => {
                    await wFormRef.value?.clearValidate('baseFormInput')
                  },
                },
                {
                  text: 'ResetFields',
                  onClick: () => {
                    wFormRef.value?.resetFields()
                  },
                },
              ],
            },
          },
        ]
      })

      const { rules } = generateBaseWFormRules(baseFormSchemas.value)

      return {
        value1,
        wFormRef,
        baseFormData,
        baseFormSchemas,
        rules,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
