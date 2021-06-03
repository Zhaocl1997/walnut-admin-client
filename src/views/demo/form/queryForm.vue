<template>
  <el-card>
    <template #header>
      <span>Base Query form：</span>

      <w-json :value="baseQueryFormData"></w-json>
      <w-form v-model="baseQueryConfigFormData" @hook="register"></w-form>
    </template>

    <w-form
      v-model="baseQueryFormData"
      :schemas="queryFormSchemas"
      query
      size="small"
      v-bind="baseQueryConfigFormData"
    >
    </w-form>
  </el-card>
</template>

<script lang="tsx">
  import { useForm, WForm } from '/@/components/UI/Form'
  import { toRefs } from '@vueuse/core'
  import { defineComponent, reactive } from 'vue'

  export default defineComponent({
    name: 'QueryFormDemo',

    setup() {
      const state = reactive({
        baseQueryFormData: {},
        baseQueryConfigFormData: {
          foldable: false,
          fold: false,
          gutter: 20,
          span: 8,
        },
        queryFormSchemas: [
          {
            type: 'Input',
            formProp: {
              label: 'Input1',
              prop: 'input1',
            },
          },
          {
            type: 'Input',
            formProp: {
              label: 'Input2',
              prop: 'input2',
            },
          },
          {
            type: 'Input',
            formProp: {
              label: 'Input3',
              prop: 'input3',
            },
          },
          {
            type: 'Input',
            formProp: {
              label: 'Input4',
              prop: 'input4',
            },
          },
          {
            type: 'Input',
            formProp: {
              label: 'Input5',
              prop: 'input5',
            },
          },
          {
            type: 'Input',
            formProp: {
              label: 'Input6',
              prop: 'input6',
            },
          },
        ] as WForm.Schema.Item[],
      })

      const [register] = useForm({
        span: 8,
        schemas: [
          {
            type: 'Switch',
            formProp: {
              label: 'Foldable',
              prop: 'foldable',
            },
          },
          {
            type: 'Render',
            formProp: {
              label: 'Gutter',
              prop: 'gutter',
            },
            componentProp: {
              render: ({ formData }) => {
                return <el-slider vModel={formData.gutter}></el-slider>
              },
            },
          },
          {
            type: 'Render',
            formProp: {
              label: 'Span',
              prop: 'span',
            },
            componentProp: {
              render: ({ formData }) => {
                return <el-slider vModel={formData.span} max={24}></el-slider>
              },
            },
          },
        ],
      })

      return {
        ...toRefs(state),
        register,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
