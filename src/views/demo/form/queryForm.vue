<template>
  <w-demo-card
    title="Query Form"
    description="Normally used in table search area."
  >
    <w-form :model="configData" @hook="register1"></w-form>

    <w-JSON :value="formData"></w-JSON>

    <w-form
      :model="formData"
      @hook="register2"
      @reset="onReset"
      @query="onQuery"
    ></w-form>
  </w-demo-card>
</template>

<script lang="tsx">
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

      const [register1] = useForm<typeof configData.value>({
        span: 12,
        xGap: 20,
        schemas: [
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
        ],
      })

      const [register2] = useForm<typeof formData.value>({
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

        register1,
        register2,

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
