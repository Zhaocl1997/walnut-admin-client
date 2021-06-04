<template>
  <el-card>
    <template #header>
      <span>Query form：</span>

      <w-json :value="baseQueryFormData"></w-json>
      <w-form v-model="baseQueryConfigFormData" @hook="register"></w-form>
    </template>

    <w-form
      v-model="baseQueryFormData"
      :schemas="queryFormSchemas"
      size="small"
      v-bind="baseQueryConfigFormData"
      @query="onQuery"
      @reset="onReset"
    >
    </w-form>
  </el-card>
</template>

<script lang="tsx">
  import type { WForm } from '/@/components/UI/Form'
  import { useForm } from '/@/components/UI/Form'
  import { defineComponent, reactive, toRefs } from 'vue'
  import { useMessage } from '/@/hooks/component/useMessage'

  export default defineComponent({
    name: 'QueryFormDemo',

    setup() {
      const state = reactive({
        baseQueryFormData: {},
        baseQueryConfigFormData: {
          query: true,
          foldable: false,
          loading: false,
          gutter: 20,
          span: 8,
          countToFold: 2,
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
        gutter: 20,
        schemas: [
          {
            type: 'Switch',
            formProp: {
              label: 'Query',
              prop: 'query',
            },
          },
          {
            type: 'Switch',
            formProp: {
              label: 'Foldable',
              prop: 'foldable',
            },
            colProp: {
              span: 4,
            },
          },
          {
            type: 'Switch',
            formProp: {
              label: 'Loading',
              prop: 'loading',
            },
            colProp: {
              span: 4,
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
          {
            type: 'Render',
            formProp: {
              label: 'Count to Fold',
              prop: 'countToFold',
            },
            componentProp: {
              render: ({ formData }) => {
                return (
                  <el-slider
                    vModel={formData.countToFold}
                    max={state.queryFormSchemas.length}
                  ></el-slider>
                )
              },
            },
          },
        ],
      })

      const onQuery = () => {
        state.baseQueryConfigFormData.loading = true

        setTimeout(() => {
          state.baseQueryConfigFormData.loading = false
          useMessage({ type: 'success', message: 'Query' })
        }, 2000)
      }

      const onReset = () => {
        useMessage({ type: 'success', message: 'Reset' })
      }

      return {
        ...toRefs(state),
        register,
        onQuery,
        onReset,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
