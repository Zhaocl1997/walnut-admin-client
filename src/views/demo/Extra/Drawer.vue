<template>
  <w-demo-card title="Drawer">
    <n-space vertical>
      <w-form @hook="register" :model="configFormData"></w-form>
    </n-space>

    <w-drawer
      v-model:show="drawerShow"
      :title="configFormData.title"
      :helpMessage="configFormData.helpMessage"
      :closable="configFormData.closable"
      :maskClosable="configFormData.maskClosable"
      :width="configFormData.width"
      :loading="configFormData.loading"
      :placement="configFormData.placement"
      :to="configFormData.scope ? '#Drawer' : undefined"
      :trap-focus="!configFormData.scope"
      :block-scroll="!configFormData.scope"
      @yes="drawerShow = false"
      @no="drawerShow = false"
    >
      <div v-for="item in configFormData.count" :key="item">
        this is drawer content {{ item }}
      </div>
    </w-drawer>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const drawerShow = ref(false)

  const configFormData = ref({
    title: 'Drawer Title',
    helpMessage: 'Drawer Help Message',
    closable: true,
    maskClosable: true,
    width: '40%',
    count: 40,
    loading: false,
    placement: 'right',
    scope: false,
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
        type: 'Base:Switch',
        formProp: {
          label: 'Loading',
          path: 'loading',
        },
      },
      {
        type: 'Base:Radio',
        formProp: {
          label: 'Placement',
          path: 'placement',
        },
        componentProp: {
          options: ['top', 'right', 'bottom', 'left'].map((item) => ({
            label: item,
            value: item,
          })),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          label: 'Scoped',
          path: 'scope',
        },
      },
      {
        type: 'Base:Button',
        componentProp: {
          textProp: 'Open Drawer',
          onClick: () => {
            drawerShow.value = true
          },
        },
      },
    ],
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DrawerDemo',

    defaultView: false,
  })
</script>
