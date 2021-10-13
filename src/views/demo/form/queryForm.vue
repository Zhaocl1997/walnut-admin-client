<template>
  <w-demo-card
    title="Query Form"
    description="Normally used in table search area."
  >
    <w-form
      :span="12"
      :x-gap="20"
      :model="configData"
      :schemas="[
        {
          type: 'Base:Switch',
          formProp: {
            label: 'Foldable',
            path: 'foldable',
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'Count to fold',
            path: 'countToFold',
          },
          componentProp: {
            min: 1,
            max: 6,
          },
          extraProp: {
            vShow: ({ formData }) => !!formData.foldable,
          },
        },
      ]"
    ></w-form>

    <w-JSON :value="formData"></w-JSON>

    <w-form
      :model="formData"
      @hook="register"
      @reset="onReset"
      @query="onQuery"
    ></w-form>
  </w-demo-card>
</template>

<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue'
  import { useForm } from '/@/components/UI/Form'

  export default defineComponent({
    name: 'QueryForm',

    setup() {
      const configData = ref({ foldable: false, countToFold: 2 })

      const formData = ref({
        input1: undefined,
        input2: undefined,
        input3: undefined,
        input4: undefined,
        input5: undefined,
        input6: undefined,
      })

      const [register] = useForm<typeof formData.value>({
        span: 8,
        xGap: 20,
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 1',
              path: 'input1',
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 2',
              path: 'input2',
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 3',
              path: 'input3',
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 4',
              path: 'input4',
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 5',
              path: 'input5',
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Input 6',
              path: 'input6',
            },
          },
          {
            type: 'Extend:Query',
            componentProp: {
              countToFold: computed(() => configData.value.countToFold),
              foldable: computed(() => configData.value.foldable),
            },
          },
        ],
      })

      return {
        configData,
        formData,

        register,

        onReset: (v: any) => {
          console.log('reset', v)
        },
        onQuery: ({ done }: any) => {
          console.log('query')

          setTimeout(() => {
            done()
          }, 2000)
        },
      }
    },
  })
</script>

<style lang="scss" scoped></style>
