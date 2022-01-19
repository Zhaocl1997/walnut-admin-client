<template>
  <div>
    <n-card
      title="相关信息"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="infoItems"
      ></w-descriptions>
    </n-card>

    <n-card
      title="生产依赖"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="DepItems"
      ></w-descriptions>
    </n-card>

    <n-card
      title="开发依赖"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="3"
        :items="DevDepItems"
      ></w-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { WDescriptionsItem } from '/@/components/UI/Descriptions'
  import pkg from '/package.json'

  const infoItems = ref<WDescriptionsItem[]>([
    {
      label: '版本',
      value: pkg.version,
      type: 'tag',
      typeProps: {
        type: 'primary',
      },
    },
    {
      label: '文档',
      value: '文档',
      type: 'link',
      typeProps: {
        type: 'primary',
        link: 'https://walnut-admin-doc.netlify.app/',
      },
    },
    {
      label: '预览',
      value: '预览',
      type: 'link',
      typeProps: {
        type: 'primary',
        link: 'http://152.136.25.175',
      },
    },
    {
      label: '源码',
      value: '源码',
      type: 'link',
      typeProps: {
        type: 'primary',
        link: 'https://github.com/Zhaocl1997',
      },
    },
  ])

  const DepItems = ref<WDescriptionsItem[]>(
    Object.entries(pkg.dependencies).map(([k, v]) => {
      return { label: k, value: v }
    }) as WDescriptionsItem[]
  )

  const DevDepItems = ref<WDescriptionsItem[]>(
    Object.entries(pkg.devDependencies).map(([k, v]) => {
      return { label: k, value: v }
    }) as WDescriptionsItem[]
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'About',
  })
</script>
