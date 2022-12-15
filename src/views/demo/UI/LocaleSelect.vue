<script lang="ts" setup>
const state = reactive({
  locale1: '',
  locale2: 'app.button.yes',
  locale3: '',
  locale4: 'sys.menu.homepage',
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'LocaleSelectDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Locale Select">
    <W-JSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <n-space vertical>
          <w-locale-select v-model:value="state.locale1" />
          <w-locale-select v-model:value="state.locale2" />
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          With prefix limit
        </w-title>

        <n-space vertical>
          <w-locale-select
            v-model:value="state.locale3"
            prefix="sys.menu."
          />

          <w-locale-select
            v-model:value="state.locale4"
            prefix="sys.menu."
          />
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
