<template>
  <w-demo-card title="Locale Select">
    <W-JSON :value="state" height="300px"></W-JSON>

    <n-list>
      <n-list-item>
        <w-title prefix="bar"> Basic usage </w-title>

        <n-space vertical>
          <WLocaleSelect v-model:value="state.locale1"></WLocaleSelect>
          <WLocaleSelect v-model:value="state.locale2"></WLocaleSelect>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar"> With prefix limit </w-title>

        <n-space vertical>
          <WLocaleSelect
            v-model:value="state.locale3"
            prefix="sys:menu:"
          ></WLocaleSelect>

          <WLocaleSelect
            v-model:value="state.locale4"
            prefix="sys:menu:"
          ></WLocaleSelect>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WLocaleSelect from '/@/components/Advanced/services/LocaleSelect'

  const state = reactive({
    locale1: '',
    locale2: 'app:button:yes',
    locale3: '',
    locale4: 'sys:menu:homepage',
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'LocaleSelectDemo',

    defaultView: false,
  })
</script>
