<template>
  <w-demo-card title="Radio">
    <W-JSON :value="state" height="300px"></W-JSON>

    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="Highly packaged dict component, support render different component type"
        >
          Basic Usage
        </w-title>

        <n-space vertical>
          <w-dict v-model:value="state.dict1" dict-type="gbt_sex"></w-dict>

          <w-dict
            v-model:value="state.dict2"
            dict-type="gbt_sex"
            dict-render-type="checkbox"
          ></w-dict>

          <w-dict
            v-model:value="state.dict3"
            dict-type="gbt_sex"
            dict-render-type="radio"
          ></w-dict>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar"> Feedback </w-title>

        <n-space vertical>
          <w-dict v-model:value="state.dict4" dict-type="gbt_sex"></w-dict>

          <w-dict
            v-model:value="state.dict5"
            dict-type="gbt_sex"
            dict-render-type="checkbox"
          ></w-dict>

          <w-dict
            v-model:value="state.dict6"
            dict-type="gbt_sex"
            dict-render-type="radio"
          ></w-dict>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar"> Also support original component props </w-title>

        <n-space vertical>
          <w-dict
            v-model:value="state.dict7"
            dict-type="gbt_sex"
            :render-component-props="{
              multiple: true,
              valueSeparator: ',',
              clearable: true,
            }"
          ></w-dict>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WDict from '/@/components/UI/Form/src/components/Extend/Dict.vue'

  const state = reactive({
    dict1: null,
    dict2: null,
    dict3: null,
    dict4: '0',
    dict5: [1, 2],
    dict6: 9,
    dict7: null,
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DictDemo',

    defaultView: false,
  })
</script>
