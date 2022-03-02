<template>
  <w-demo-card title="Scrollbar">
    <w-title prefix="bar">Horizontal Position: {{ position }}</w-title>

    <n-space size="small">
      <n-button @click="scrollRef?.scrollTo({ top: 800 })"
        >Scroll to 800px position</n-button
      >
      <n-button @click="scrollRef?.scrollTo({ top: 1600 })"
        >Scroll to 1600px position</n-button
      >

      <n-button @click="scrollRef?.scrollToStart()">Scroll to Top</n-button>
      <n-button @click="scrollRef?.scrollToEnd()">Scroll to Bottom</n-button>

      <n-button @click="scrollRef?.scrollToIndex(20)"
        >Scroll to index 20</n-button
      >

      <n-button @click="scrollRef?.scrollToIndex(60)"
        >Scroll to index 60</n-button
      >
    </n-space>

    <div class="mt-2 border border-2 border-gray-600 rounded-sm">
      <w-scrollbar
        ref="scrollRef"
        v-model="position"
        height="500px"
        :el-size="36"
      >
        <div v-for="i in 100" :key="i" class="text-3xl">Horizontal-{{ i }}</div>
      </w-scrollbar>
    </div>

    <n-divider></n-divider>

    <w-title prefix="bar">Vertical Position: {{ positionVertival }}</w-title>

    <n-space size="small">
      <n-button @click="scrollVerticalRef?.scrollTo({ left: 800 })"
        >Scroll to 800px position</n-button
      >
      <n-button @click="scrollVerticalRef?.scrollTo({ left: 1600 })"
        >Scroll to 1600px position</n-button
      >

      <n-button @click="scrollVerticalRef?.scrollToStart()"
        >Scroll to Left</n-button
      >
      <n-button @click="scrollVerticalRef?.scrollToEnd()"
        >Scroll to Right</n-button
      >

      <n-button @click="scrollVerticalRef?.scrollToIndex(40)"
        >Scroll to index 40</n-button
      >

      <n-button @click="scrollVerticalRef?.scrollToIndex(80)"
        >Scroll to index 80</n-button
      >
    </n-space>

    <div class="mt-2 border border-2 border-gray-600 rounded-sm h-12">
      <w-scrollbar
        ref="scrollVerticalRef"
        v-model="positionVertival"
        vertical
        height="100px"
      >
        <div class="hstack whitespace-nowrap">
          <div v-for="i in 100" :key="i" class="text-3xl mx-3">
            Vertical-{{ i }}
          </div>
        </div>
      </w-scrollbar>
    </div>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

  const position = ref(0)
  const positionVertival = ref(0)

  const scrollRef = ref<Nullable<WScrollbarRef>>(null)
  const scrollVerticalRef = ref<Nullable<WScrollbarRef>>(null)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'ScrollbarDemo',

    defaultView: false,
  })
</script>
