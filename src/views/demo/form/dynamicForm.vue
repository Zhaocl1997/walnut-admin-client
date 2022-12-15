<script lang="ts">
export default defineComponent({
  name: 'DynamicForm',

  setup() {
    const configFormData = ref({
      vIf: true,
      vShow: true,
      transition1: 'fade' as ValueOfAppConstTransitionName,
      transition2: 'fade' as ValueOfAppConstTransitionName,
      disabled: false,
      labelHelpMessage: true,
      labelWidth: 80,
      span: 8,
      xGap: 20,
      yGap: 0,
      inputOneLabel: 'Input 1',
      inputOneSpan: 8,
    })

    const formData = ref({
      input1: undefined,
      input2: undefined,
      input3: 'input3',
      input4: undefined,
      input5: undefined,
      input6: undefined,
    })

    const [register1] = useForm({
      labelWidth: 200,
      span: 12,
      schemas: [
        {
          type: 'Base:Switch',
          formProp: {
            label: '`v-if` to control `Input 1`',
            path: 'vIf',
          },
        },
        {
          type: 'Extend:TransitionSelect',
          formProp: {
            label: 'Transition for Input 1',
            path: 'transition1',
          },
        },
        {
          type: 'Base:Switch',
          formProp: {
            label: '`v-show` to control `Input 2`',
            path: 'vShow',
          },
        },
        {
          type: 'Extend:TransitionSelect',
          formProp: {
            label: 'Transition for Input 2',
            path: 'transition2',
          },
        },
        {
          type: 'Base:Switch',
          formProp: {
            label: 'Disable Input 6',
            path: 'disabled',
          },
        },
        {
          type: 'Base:Switch',
          formProp: {
            label: 'Label help message',
            path: 'labelHelpMessage',
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'Label width',
            path: 'labelWidth',
          },
          componentProp: {
            min: 0,
            max: 150,
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'Span',
            path: 'span',
          },
          componentProp: {
            min: 0,
            max: 24,
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'x-gap',
            path: 'xGap',
          },
          componentProp: {
            min: 0,
            max: 100,
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'y-gap',
            path: 'yGap',
          },
          componentProp: {
            min: 0,
            max: 100,
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 1 label',
            path: 'inputOneLabel',
          },
        },
        {
          type: 'Base:Slider',
          formProp: {
            label: 'Input 1 span',
            path: 'inputOneSpan',
          },
          componentProp: {
            min: 0,
            max: 24,
          },
        },
      ],
    })

    const [register2] = useForm<typeof formData.value>({
      span: computed(() => configFormData.value.span),
      labelWidth: computed(() => configFormData.value.labelWidth),
      xGap: computed(() => configFormData.value.xGap),
      yGap: computed(() => configFormData.value.yGap),
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            label: computed(() => configFormData.value.inputOneLabel),
            path: 'input1',
          },
          componentProp: {
            clearable: true,
          },
          gridProp: {
            span: computed(() => configFormData.value.inputOneSpan),
          },
          transitionProp: {
            name: computed(() => configFormData.value.transition1),
          },
          extraProp: {
            vIf: computed(() => configFormData.value.vIf),
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 2',
            path: 'input2',
          },
          componentProp: {
            clearable: true,
          },
          transitionProp: {
            name: computed(() => configFormData.value.transition2),
          },
          extraProp: {
            vShow: computed(() => configFormData.value.vShow),
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 3',
            path: 'input3',
            labelHelpMessage: computed(() =>
              configFormData.value.labelHelpMessage
                ? 'Input 4 will show once Input 3 has value.'
                : '',
            ),
          },
          componentProp: {
            clearable: true,
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 4',
            path: 'input4',
          },
          componentProp: {
            clearable: true,
          },
          extraProp: {
            vShow: ({ formData }) => !!formData.input3,
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 5',
            path: 'input5',
          },
          componentProp: {
            clearable: true,
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            label: 'Input 6',
            path: 'input6',
          },
          componentProp: {
            clearable: true,
            disabled: computed(() => configFormData.value.disabled),
          },
        },
      ],
    })

    return {
      configFormData,
      formData,
      register1,
      register2,
    }
  },
})
</script>

<template>
  <w-demo-card title="Dynamic Form" description="Some features.">
    <w-form :model="configFormData" @hook="register1" />

    <w-JSON :value="formData" />

    <w-form :model="formData" @hook="register2" />
  </w-demo-card>
</template>

<style lang="scss" scoped></style>
