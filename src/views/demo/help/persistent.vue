<template>
  <w-demo-card title="Persistent Demo">
    <w-form @hook="register" :model="formData"></w-form>
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Persistent',
  })
</script>

<script lang="ts" setup>
  const formData = ref({
    type: 'localStorage',
    key: '',
    value: '' as any,
    maxAge: 0,
  })

  const onChange = () => {
    formData.value.value = useAppStorage(
      formData.value.key,
      formData.value.value,
      formData.value.maxAge,
      formData.value.type === 'sessionStorage' ? sessionStorage : localStorage
    )
  }

  const [register] = useForm({
    labelWidth: '100px',
    schemas: [
      {
        type: 'Base:Select',
        formProp: {
          path: 'type',
          label: 'Storage type',
        },
        componentProp: {
          options: [
            {
              value: 'localStorage',
              label: 'Local Storage',
            },
            {
              value: 'sessionStorage',
              label: 'Session Storage',
            },
            {
              value: 'cookie',
              label: 'Cookie',
            },
          ],
          onUpdateValue: onChange,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'key',
          label: 'Key',
        },
        componentProp: {},
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'value',
          label: 'Value',
        },
        componentProp: {},
        gridProp: {
          span: 20,
        },
      },

      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'maxAge',
          label: 'Max Age',
          labelHelpMessage: 'Unit seconds',
        },
        componentProp: {},
      },

      {
        type: 'Base:ButtonGroup',
        componentProp: {
          groups: [
            {
              textProp: 'Set',
              onClick: onChange,
            },

            {
              textProp: 'Get',
              onClick: onChange,
            },
          ],
        },
        gridProp: {
          span: 10,
        },
      },
    ],
  })
</script>

<style lang="scss" scoped></style>
