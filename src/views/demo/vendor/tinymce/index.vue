<template>
  <w-demo-card title="Tinymce Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Basic usage</w-title>

        <pre class="whitespace-pre-wrap">Value: {{ value }}</pre>
        <WVendorTinymceEditor
          v-model:value="value"
          disabled
        ></WVendorTinymceEditor>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Form usage</w-title>

        <pre class="whitespace-pre-wrap">{{ formData }}</pre>

        <w-form @hook="register" :model="formData"></w-form>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WVendorTinymceEditor from '/@/components/Vendor/tinymce'

  const value = ref(
    '<p style="text-align: center;"><span style="color: rgb(224, 62, 45); font-size: 36pt;"><em><strong>This is default content</strong></em></span></p>'
  )

  const formData = ref({
    title: 'This is default title',
    content:
      '<p style="text-align: center;"><span style="color: rgb(224, 62, 45); font-size: 36pt;"><em><strong>This is default content</strong></em></span></p>',
  })

  const [register] = useForm<typeof formData.value>({
    labelWidth: 100,
    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'title',
          label: 'Title',
          required: true,
        },
      },
      {
        type: 'Vendor:Tinymce',
        formProp: {
          path: 'content',
          label: 'Content',
          required: true,
        },
      },
    ],
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TinymceDemo',
  })
</script>

<style lang="scss" scoped></style>
