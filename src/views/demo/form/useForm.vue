<template>
  <el-card>
    <template #header>
      <span>useForm hook：</span>

      <w-json :value="demoFormData"></w-json>
      <w-form v-model="formConfig" @hook="registerConfig"></w-form>
    </template>

    <w-form v-model="demoFormData" @hook="registerDemo">
      <template #baseSlot="{ disabled }">
        <el-input
          v-model="demoFormData.baseSlot"
          :disabled="disabled"
          placeholder="Slot render El-input"
        ></el-input>
      </template>
    </w-form>
  </el-card>
</template>

<script lang="ts">
  import type { WForm } from '/@/components/UI/Form'
  import { useForm } from '/@/components/UI/Form'
  import { defineComponent, computed } from 'vue'

  import { useFormConfig } from './configSchema'

  export default defineComponent({
    name: 'UseFormDemo',

    setup() {
      const fns = {
        validate: async () => {
          const valid = await validate()
          console.log('[Validate]', valid)
        },
        validateField: async () => {
          const msg = await validateField('baseFormInput')
          console.log('[ValidateField]', msg)
        },
        clearValidate: async () => {
          await clearValidate()
        },
        clearValidateInput: async () => {
          await clearValidate('baseFormInput')
        },
        resetFields: async () => {
          await resetFields()
        },
      }

      const {
        formConfig,
        formConfigSchemas,
        demoFormData,
        demoFormSchemas,
        demoFormRules,
      } = useFormConfig(fns)

      const [registerConfig] = useForm({
        schemas: formConfigSchemas,
        span: 6,
      })

      const [
        registerDemo,
        { validate, validateField, resetFields, clearValidate },
      ] = useForm({
        schemas: demoFormSchemas,
        rules: demoFormRules,
        disabled: computed(() => formConfig.disabled),
        inline: computed(() => formConfig.inline),
        labelPosition: computed(() => formConfig.labelPosition),
        size: computed(() => formConfig.size),
        labelWidth: computed(() => formConfig.labelWidth),
        compact: computed(() => formConfig.compact),
      })

      return {
        registerConfig,
        formConfig,
        registerDemo,
        demoFormData,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
