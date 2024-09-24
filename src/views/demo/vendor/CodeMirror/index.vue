<script lang="ts" setup>
defineOptions({
  name: 'CodeMirrorDemo',
})

const code1Raw = import.meta.glob(
  '@/hooks/vueuse/useDark.ts',
  {
    as: 'raw',
    eager: true,
  },
)

const code2Raw = import.meta.glob(
  '@/components/App/AppLocalePicker/useAppLocale.ts',
  {
    as: 'raw',
    eager: true,
  },
)

const code1 = ref(Object.values(code1Raw)[0])
const code2 = ref(Object.values(code2Raw)[0])
</script>

<template>
  <WDemoCard title="CodeMirror Demo">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar">
          Basic (javascript)
        </WTitle>

        <w-code-mirror v-model:value="code1" />
      </n-list-item>
    </n-list>

    <n-list>
      <n-list-item>
        <WTitle prefix="bar">
          Disabled (javascript)
        </WTitle>

        <w-code-mirror v-model:value="code2" disabled />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
