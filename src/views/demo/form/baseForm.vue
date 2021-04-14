<template>
  <el-card>
    <template #header>
      <span>Base form：</span>

      <WJson :value="baseFormData"></WJson>
    </template>

    <w-form
      ref="wFormRef"
      v-model="baseFormData"
      :schemas="baseFormSchemas"
      :rules="baseFormRules"
    >
      <template #baseFormSlot>
        <span>custom slot</span>
      </template>
    </w-form>
  </el-card>
</template>

<script lang="ts">
  import type {
    WFormMethods,
    WFormRule,
    WFormSchemaItem,
  } from '/@/components/UI/Form'
  import { ref, reactive, defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'BaseFormDemo',

    setup() {
      const wFormRef = ref<Nullable<WFormMethods>>(null)
      const baseFormData = reactive({
        // need to init an empty array when multiple true
        baseFormCheckbox: [],
      })

      const baseFormSchemas = computed((): WFormSchemaItem[] => {
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
            type: 'Input',
            formProp: {
              prop: 'baseFormSlot',
              label: 'Slot',
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
                  onClick: () => {
                    wFormRef.value?.clearValidate()
                  },
                },
                {
                  text: 'ClearValidate(Input)',
                  onClick: () => {
                    wFormRef.value?.clearValidate('baseFormInput')
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

      const baseFormRules: WFormRule = {
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

      return {
        wFormRef,
        baseFormData,
        baseFormSchemas,
        baseFormRules,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
