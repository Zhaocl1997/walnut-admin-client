<script lang="ts" setup>
defineOptions({
  name: 'TinymceDemo',
})

const value = ref(
  '<p style="text-align: center;"><span style="color: rgb(224, 62, 45); font-size: 36pt;"><em><strong>This is default content</strong></em></span></p>',
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

<template>
  <w-demo-card title="Tinymce Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <pre class="whitespace-pre-wrap">Value: {{ value }}</pre>
        <w-tinymce
          v-model:value="value"
          disabled
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Form usage
        </w-title>

        <pre class="whitespace-pre-wrap">{{ formData }}</pre>

        <w-form :model="formData" @hook="register" />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<style lang="scss" scoped></style>
