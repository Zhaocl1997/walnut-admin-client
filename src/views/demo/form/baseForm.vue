<template>
  <el-card>
    <template #header>
      <span>Base form：</span>

      <w-json :value="demoFormData"></w-json>
      <el-slider v-model="value1" :max="24" :min="0"></el-slider>
      <w-form
        v-model="formConfig"
        :schemas="formConfigSchemas"
        :span="6"
      ></w-form>
    </template>

    <w-form
      ref="wFormRef"
      v-model="demoFormData"
      :schemas="demoFormSchemas"
      :rules="demoFormRules"
      :span="value1"
      foldable
      v-bind="formConfig"
    >
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
  import { ref, defineComponent } from 'vue'

  import { useFormConfig } from './configSchema'

  export default defineComponent({
    name: 'BaseFormDemo',

    setup() {
      const value1 = ref(24)

      const wFormRef = ref<Nullable<WForm.Methods>>(null)

      const fns = {
        validate: async () => {
          const valid = await wFormRef.value?.validate()
          console.log('[Validate]', valid)
        },
        validateField: async () => {
          const msg = await wFormRef.value?.validateField('baseFormInput')
          console.log('[ValidateField]', msg)
        },
        clearValidate: async () => {
          await wFormRef.value?.clearValidate()
        },
        clearValidateInput: async () => {
          await wFormRef.value?.clearValidate('baseFormInput')
        },
        resetFields: async () => {
          await wFormRef.value?.resetFields()
        },
      }

      const {
        formConfig,
        formConfigSchemas,
        demoFormData,
        demoFormSchemas,
        demoFormRules,
      } = useFormConfig(fns)

      return {
        wFormRef,

        formConfig,
        formConfigSchemas,

        value1,
        demoFormData,
        demoFormSchemas,
        demoFormRules,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
