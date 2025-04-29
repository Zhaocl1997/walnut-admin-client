<script lang="ts" setup>
import type { WForm } from '@/components/UI/Form'

defineOptions({
  name: 'DialogForm',
  defaultView: false,
})

const configData = ref({
  preset: 'modal' as WForm.FormDialogPreset,
  maskClosable: true,
  title: 'Title',
})

const formData = ref<Recordable>({})

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

const [register2, { onOpen }] = useForm<typeof formData.value>({
  dialogPreset: computed(() => configData.value.preset),
  dialogProps: {
    maskClosable: computed(() => configData.value.maskClosable),
    draggable: true,
    title: computed(() => configData.value.title),
    onYes: (_, done) => {
      setTimeout(() => {
        useAppMessage().success('Success')
        done()
        formData.value = {}
      }, 2000)
    },
    onNo: (close) => {
      close()
    },
    width: '500px',
  },
  labelWidth: 80,
  schemas: Array.from({ length: 4 }, (v, k) => {
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
  setTimeout(() => {
    onOpen((done) => {
      setTimeout(() => {
        done()
      }, 2000)
    })
  }, 500)
}
</script>

<template>
  <WDemoCard title="Dialog FOrm" description="Form implement with modal/drawer">
    <WForm :model="configData" @hook="register1" />

    <WJSON :value="formData" />

    <n-button @click="onOpenAdvacned">
      Open Dialog Form
    </n-button>

    <WForm :model="formData" @hook="register2" />
  </WDemoCard>
</template>
