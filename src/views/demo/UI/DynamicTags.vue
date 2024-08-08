<script lang="ts" setup>
defineOptions({
  name: 'DynamicTagsDemo',
  defaultView: false,
})

const state = reactive({
  dynamicTag1: [],
  dynamicTag2: ['1', '2', '3', '4'],
})
</script>

<template>
  <w-demo-card title="Dynamic Tags">
    <W-JSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <n-space vertical>
          <w-dynamic-tags v-model:value="state.dynamicTag1" />

          <w-dynamic-tags v-model:value="state.dynamicTag2" />
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
