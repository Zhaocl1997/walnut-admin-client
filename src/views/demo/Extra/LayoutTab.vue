<template>
  <w-demo-card title="Demo for layout tab">
    <div>{{ index }}</div>
    <n-button @click="onCreate(0)">Create</n-button>
    <n-button @click="onDelete">Delete</n-button>
    <n-button @click="onCreate(1)">Create with query</n-button>
    <n-button @click="onCreate(2)">Create with params</n-button>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const appTab = useAppStoreTab()

  const index = ref(0)

  const onCreate = (type: number) => {
    const query =
      type === 1 ? { testQuery1: 1, testQuery2: 'abc', testQuery3: false } : {}

    const params =
      type === 2 ? { testParam1: 1, testParam2: 'abc', testParam3: false } : {}

    appTab.createTabs({
      name: `name-${index.value}`,
      path: `path-${index.value}`,
      meta: {
        title: `demo-tab-${index.value}`,
        icon: 'ant-design:home-outlined',
      },
      query,
      params,
    })

    index.value++
  }

  const onDelete = () => {
    if (!index.value) return

    index.value--

    appTab.deleteTabs(`name-${index.value}`)
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'LayoutDemoTab',

    defaultView: false,
  })
</script>
