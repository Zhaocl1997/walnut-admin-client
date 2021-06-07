<template>
  <el-card>
    <template #header>
      <span>Multi form：</span>

      <w-json :value="multiFormData"></w-json>
    </template>

    <w-form v-model="multiFormData" @hook="register"> </w-form>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { useForm } from '/@/components/UI/Form'

  export default defineComponent({
    name: 'MultiFormDemo',

    components: {},

    setup() {
      const state = reactive({
        multiFormData: {
          multiple1: ['123', '321', '342'],
        },
      })

      const [register] = useForm({
        schemas: [
          {
            type: 'Divider',
            componentProp: {
              title: 'Base Multiple',
            },
          },
          {
            type: 'Multiple',
            formProp: {
              label: 'Multiple Item',
              prop: 'multiple1',
            },
            componentProp: {
              preset: 'input',
              presetProps: {
                placeholder: 'Input something',
              },
              min: 3,
              max: 6,
            },
          },
          {
            type: 'Divider',
            componentProp: {
              title: 'Key-Value Pair Multiple',
            },
          },
          {
            type: 'Multiple',
            formProp: {
              label: 'Multiple Item',
              prop: 'multiple2',
            },
            componentProp: {
              preset: 'pair',
              keyField: 'key1',
              valueField: 'value1',
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
