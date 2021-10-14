<template>
  <w-demo-card title="Divider Form" description="Extend Divider Schema Item">
    <w-form @hook="register1" :model="configData"></w-form>

    <w-JSON :value="formData"></w-JSON>

    <w-form @hook="register2" :model="formData"></w-form>
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'DividerForm',

    setup() {
      const configData = ref({
        title: '',
        titlePlacement: 'center' as 'left' | 'center' | 'right',
        foldable: false,
        helpMessage: '',
        startIndex: 0,
        endIndex: 6,
        prefix: [],
        type: 'default' as 'default' | 'success' | 'info' | 'warning' | 'error',
      })

      const [register1] = useForm<typeof configData.value>({
        span: 12,
        xGap: 20,
        labelWidth: 100,
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              label: 'Title',
              path: 'title',
            },
            componentProp: {
              clearable: true,
            },
          },
          {
            type: 'Base:Radio',
            formProp: {
              label: 'Placement',
              path: 'titlePlacement',
            },
            componentProp: {
              options: ['left', 'center', 'right'].map((i) => ({
                value: i,
                label: i,
              })),
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.title,
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              label: 'Help Message',
              path: 'helpMessage',
            },
            componentProp: {
              clearable: true,
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.title,
            },
          },
          {
            type: 'Base:Switch',
            formProp: {
              label: 'Foldable',
              path: 'foldable',
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.title,
            },
          },
          {
            type: 'Base:InputNumber',
            formProp: {
              label: 'Start Index',
              path: 'startIndex',
            },
            componentProp: {
              min: 0,
              max: computed(() => configData.value.endIndex),
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.foldable,
            },
          },
          {
            type: 'Base:InputNumber',
            formProp: {
              label: 'End Index',
              path: 'endIndex',
            },
            componentProp: {
              min: computed(() => configData.value.startIndex),
              max: 6,
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.foldable,
            },
          },
          {
            type: 'Base:Checkbox',
            formProp: {
              label: 'Left bar',
              path: 'prefix',
            },
            componentProp: {
              options: [
                {
                  label: 'Bar',
                  value: 'bar',
                },
              ],
            },
            extraProp: {
              vShow: ({ formData }) => !!formData.title,
            },
          },
          {
            type: 'Base:Radio',
            formProp: {
              label: 'Type',
              path: 'type',
            },
            componentProp: {
              options: ['default', 'success', 'info', 'warning', 'error'].map(
                (i) => ({ value: i, label: i })
              ),
            },
            extraProp: {
              vShow: ({ formData }) => formData.prefix.length !== 0,
            },
          },
        ],
      })

      const formData = ref({
        input1: undefined,
        input2: undefined,
        input3: undefined,
        input4: undefined,
        input5: undefined,
        input6: undefined,
      })

      const [register2] = useForm({
        span: 8,
        xGap: 20,
        schemas: [
          {
            type: 'Extend:Divider',
            componentProp: {
              title: computed(() => configData.value.title),
              titlePlacement: computed(() => configData.value.titlePlacement),
              foldable: computed(() => configData.value.foldable),
              helpMessage: computed(() => configData.value.helpMessage),
              startIndex: computed(() => configData.value.startIndex),
              endIndex: computed(() => configData.value.endIndex),
              prefix: computed(() => configData.value.prefix[0]),
              type: computed(() => configData.value.type),
            },
          },
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
        ],
      })

      return {
        configData,
        register1,
        formData,
        register2,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
