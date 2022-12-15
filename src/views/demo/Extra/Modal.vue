<script lang="ts" setup>
const modalShow = ref(false)

const configFormData = ref({
  title: 'Modal Title',
  helpMessage: 'Modal Help Message',
  closable: true,
  maskClosable: true,
  width: '40%',
  height: undefined,
  count: 20,
  loading: false,
  draggable: true,
  fullscreen: true,
})

const [register] = useForm<typeof configFormData.value>({
  labelWidth: 100,
  yGap: 10,
  showFeedback: false,
  schemas: [
    {
      type: 'Base:Input',
      formProp: {
        label: 'Title',
        path: 'title',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Help Message',
        path: 'helpMessage',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Closable',
        path: 'closable',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Mask Closable',
        path: 'maskClosable',
      },
    },
    {
      type: 'Base:InputNumber',
      formProp: {
        label: 'Counter',
        path: 'count',
      },
      componentProp: {
        step: 20,
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Width',
        path: 'width',
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        label: 'Height',
        path: 'height',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Loading',
        path: 'loading',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Draggable',
        path: 'draggable',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        label: 'Full Screen',
        path: 'fullscreen',
      },
    },

    {
      type: 'Base:Button',
      componentProp: {
        textProp: 'Open Modal',
        onClick: () => {
          modalShow.value = true
        },
      },
    },
  ],
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'ModalDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Modal">
    <n-space vertical>
      <w-form :model="configFormData" @hook="register" />
    </n-space>

    <w-modal
      v-model:show="modalShow"
      :title="configFormData.title"
      :help-message="configFormData.helpMessage"
      :closable="configFormData.closable"
      :mask-closable="configFormData.maskClosable"
      :width="configFormData.width"
      :height="configFormData.height"
      :loading="configFormData.loading"
      :draggable="configFormData.draggable"
      :fullscreen="configFormData.fullscreen"
      @yes="modalShow = false"
      @no="modalShow = false"
    >
      <div v-for="item in configFormData.count" :key="item">
        this is modal content {{ item }}
      </div>
    </w-modal>
  </w-demo-card>
</template>
