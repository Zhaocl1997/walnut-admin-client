<script lang="ts" setup>
import type { WForm } from '@/components/UI/Form'

defineOptions({
  name: 'QueryForm',
})

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

function onReset({ done }: WForm.FinishLoading) {
  console.log('reset')

  setTimeout(() => {
    done()
  }, 2000)
}

function onQuery({ done }: WForm.FinishLoading) {
  console.log('query')

  setTimeout(() => {
    done()
  }, 2000)
}
</script>

<template>
  <w-demo-card
    title="Query Form"
    description="Normally used in table search area."
  >
    <w-form :model="configData" @hook="register1" />

    <w-JSON :value="formData" />

    <w-form
      :model="formData"
      @hook="register2"
      @reset="onReset"
      @query="onQuery"
    />
  </w-demo-card>
</template>

<style lang="scss" scoped></style>
