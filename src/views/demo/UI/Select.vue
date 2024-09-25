<script lang="ts" setup>
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

defineOptions({
  name: 'SelectDemo',
  defaultView: false,
})

const state = reactive<any>({
  select1: '1',
  select2: 1,
  select3: ['1', '3', '5'],
  select4: [1, 3, 5],
  select5: '2,4,6',
  select6: '',
  select7: [],
  select8: '',
  select9: '999',
})

const options: SelectMixedOption[] = []

for (let i = 0; i < 100; i++) {
  options.push({
    value: `${i + 1}`,
    label: `label-${i + 1}`,
  })
}

options.push({
  value: '999',
  label:
      'label-999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
})
</script>

<template>
  <WDemoCard title="Select">
    <W-JSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="string/number will all feedback correctly"
        >
          Basic usage
        </WTitle>

        <n-space vertical>
          <WSelect
            v-model:value="state.select1"
            :options="options"
            clearable
          />

          <WSelect
            v-model:value="state.select2"
            :options="options"
            clearable
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="same for multiple, string/number will all feedback correctly"
        >
          Multiple
        </WTitle>

        <n-space vertical>
          <WSelect
            v-model:value="state.select3"
            :options="options"
            clearable
            multiple
          />

          <WSelect
            v-model:value="state.select4"
            :options="options"
            clearable
            multiple
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="provide a `value-separator` prop to use select with a string value"
        >
          Multiple but value is string
        </WTitle>

        <WSelect
          v-model:value="state.select5"
          :options="options"
          clearable
          multiple
          value-separator=","
        />
      </n-list-item>

      <!-- <n-list-item>
        <WTitle
          prefix="bar"
          help-message="The example is role select, later will got MORE components like this"
        >
          Highly packaged for a remote list select
        </WTitle>

        <n-space vertical>
          TODO business component
          <w-role-select v-model:value="state.select6" />

          <w-role-select v-model:value="state.select7" multiple />

          <w-role-select
            v-model:value="state.select8"
            multiple
            value-separator="|"
          />
        </n-space>
      </n-list-item> -->

      <n-list-item>
        <WTitle prefix="bar">
          If label too long, you can add a tooltip prop
        </WTitle>

        <WSelect
          v-model:value="state.select9"
          class="w-1/2"
          :options="options"
          clearable
          tooltip
          :tooltip-props="{
            placement: 'left',
          }"
        />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
