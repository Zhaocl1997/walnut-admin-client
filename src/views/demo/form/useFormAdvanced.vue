<script lang="ts" setup>
defineOptions({
  name: 'UseFormAdvanced',
})

const configData = ref({
  preset: 'modal',
  maskClosable: true,
  title: 'Title',
})

const formData = ref({})

const [register1] = useForm<typeof configData.value>({
  span: 12,
  labelWidth: 80,
  schemas: [
    {
      type: 'Base:Radio',
      formProp: {
        path: 'preset',
        label: 'Preset',
      },
      componentProp: {
        button: true,
        options: ['drawer', 'modal'].map(i => ({
          label: i,
          value: i,
        })),
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
  ],
})

const [register2, { onOpen }] = useForm({
  preset: computed(() => configData.value.preset),
  advancedProps: {
    maskClosable: computed(() => configData.value.maskClosable),
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
    width: '500px',
  },
  labelWidth: 80,
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

function onOpenAdvacned() {
  onOpen((done) => {
    setTimeout(() => {
      done()
    }, 2000)
  })
}
</script>

<template>
  <w-demo-card title="useForm(advanced)" description="Advanced Form usage.">
    <w-form :model="configData" @hook="register1" />

    <w-JSON :value="formData" />

    <n-button @click="onOpenAdvacned">
      Open An Advanced Form
    </n-button>

    <w-form :model="formData" @hook="register2" />
  </w-demo-card>
</template>
