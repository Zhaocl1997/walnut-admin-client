<template>
  <w-demo-card title="useForm(advanced)" description="Advanced Form usage.">
    <w-form @hook="register1" :model="configData"></w-form>

    <w-JSON :value="formData"></w-JSON>

    <n-button @click="onOpenAdvacned">Open An Advanced Form</n-button>

    <w-form @hook="register2" :model="formData"></w-form>
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'UseFormAdvanced',
  })
</script>

<script lang="ts" setup>
  const configData = ref({
    preset: false,
    maskClosable: true,
    title: 'Title',
    negativeText: 'No',
    positiveText: 'Yes',
  })

  const formData = ref({})

  const [register1] = useForm<typeof configData.value>({
    span: 8,
    xGap: 20,
    labelWidth: 120,
    schemas: [
      {
        type: 'Base:Switch',
        formProp: {
          path: 'preset',
          label: 'Preset',
        },
        componentProp: {
          checkedText: 'Drawer',
          uncheckedText: 'Modal',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'maskClosable',
          label: 'Mask Close',
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'title',
          label: 'Title',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'negativeText',
          label: 'No Text',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'positiveText',
          label: 'Yes Text',
        },
        componentProp: {
          clearable: true,
        },
      },
    ],
  })

  const [register2, { onOpen }] = useForm({
    preset: computed(() => (configData.value.preset ? 'drawer' : 'modal')),
    advancedProps: {
      maskClosable: computed(() => configData.value.maskClosable),
      negativeText: computed(() => configData.value.negativeText),
      positiveText: computed(() => configData.value.positiveText),
      title: computed(() => configData.value.title),
      onYes: (_, done) => {
        setTimeout(() => {
          useAppMessage().success('Success')
          done()
          formData.value = {}
        }, 2000)
      },
      onNo: (done) => {
        done()
      },
      width: '400px',
    },
    span: 18,
    labelWidth: 100,
    schemas: Array.from({ length: 20 }, (v, k) => {
      return {
        type: 'Base:Input',
        formProp: {
          label: `Input ${k + 1}`,
          path: `input${k + 1}`,
          rule: {
            required: true,
            trigger: 'change',
          },
        },
      }
    }),
  })

  const onOpenAdvacned = () => {
    const { done } = onOpen()

    setTimeout(() => {
      done()
    }, 2000)
  }
</script>
