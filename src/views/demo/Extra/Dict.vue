<script lang="ts" setup>
defineOptions({
  name: 'DictDemo',
  defaultView: false,
})

const state = reactive({
  dict1: undefined,
  dict2: undefined,
  dict3: undefined,
  dict4: '0',
  dict5: [1, 2],
  dict6: 9,
  dict7: undefined,
  dict8: true,
  dict9: false,
})
</script>

<template>
  <WDemoCard title="Dictionary">
    <W-JSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="Highly packaged dict component, support render different component type"
        >
          Basic Usage
        </WTitle>

        <n-space vertical>
          <WDict v-model:value="state.dict1" dict-type="gbt_sex" />

          <WDict
            v-model:value="state.dict2"
            dict-type="gbt_sex"
            dict-render-type="checkbox"
          />

          <WDict
            v-model:value="state.dict3"
            dict-type="gbt_sex"
            dict-render-type="radio"
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Feedback
        </WTitle>

        <n-space vertical>
          <WDict v-model:value="state.dict4" dict-type="gbt_sex" />

          <WDict
            v-model:value="state.dict5"
            dict-type="gbt_sex"
            dict-render-type="checkbox"
          />

          <WDict
            v-model:value="state.dict6"
            dict-type="gbt_sex"
            dict-render-type="radio"
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Also support original component props
        </WTitle>

        <WDict
          v-model:value="state.dict7"
          dict-type="gbt_sex"
          :render-component-props="{
            multiple: true,
            valueSeparator: ',',
            clearable: true,
          }"
        />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Handle boolean value
        </WTitle>

        <n-space vertical>
          <WDict
            v-model:value="state.dict8"
            dict-type="sys_shared_status"
            dict-render-type="radio"
            :render-component-props="{ button: true, valueType: 'boolean' }"
          />

          <WDict
            v-model:value="state.dict9"
            dict-type="sys_shared_status"
            dict-render-type="radio"
            :render-component-props="{ button: true, valueType: 'boolean' }"
          />
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
