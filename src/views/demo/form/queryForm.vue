<script lang="ts" setup>
import type { WForm } from '@/components/UI/Form'

defineOptions({
  name: 'QueryForm',
})

const configData = ref({ foldable: false, countToFold: 2 })

const formData = ref({
  input1: '1',
  input2: '2',
  input3: '3',
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
      type: 'Raw:Slider',
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
  <WDemoCard
    title="Query Form"
    description="Normally used in table search area."
  >
    <WForm :model="configData" @hook="register1" />

    <WJSON :value="formData" />

    <WForm
      :model="formData"
      @hook="register2"
      @reset="onReset"
      @query="onQuery"
    />
  </WDemoCard>
</template>

<style lang="scss" scoped></style>
