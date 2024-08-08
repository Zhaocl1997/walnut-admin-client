<script lang="ts" setup>
defineOptions({
  name: 'DividerForm',
})

const configData = ref({
  title: '',
  titlePlacement: 'center',
  dashed: false,
  foldable: false,
  helpMessage: '',
  startIndex: 0,
  endIndex: 6,
  prefix: [],
  type: 'default',
})

const [register1] = useForm<typeof configData.value>({
  span: 12,
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
        options: ['left', 'center', 'right'].map(i => ({
          value: i,
          label: i,
        })),
      },
      extraProp: {
        vShow: ({ formData }) => !!formData.title,
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Dashed',
        path: 'dashed',
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
        multiple: true,
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
          i => ({ value: i, label: i }),
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

const [register2] = useForm<typeof formData.value>({
  span: 8,
  schemas: [
    {
      type: 'Extend:Divider',
      componentProp: {
        titlePlacement: computed(() => configData.value.titlePlacement),
        dashed: computed(() => configData.value.dashed),
        prefix: computed(() => configData.value.prefix[0]),
        type: computed(() => configData.value.type),
        title: computed(() => configData.value.title),
        helpMessage: computed(() => configData.value.helpMessage),
        foldable: computed(() => configData.value.foldable),
        startIndex: computed(() => configData.value.startIndex),
        endIndex: computed(() => configData.value.endIndex),
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
</script>

<template>
  <w-demo-card title="Divider Form" description="Extend Divider Schema Item">
    <w-form :model="configData" @hook="register1" />

    <w-JSON :value="formData" />

    <w-form :model="formData" @hook="register2" />
  </w-demo-card>
</template>
