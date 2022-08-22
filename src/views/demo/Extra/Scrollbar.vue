<template>
  <w-demo-card title="Scrollbar">
    <w-title prefix="bar"
      >Vertical Position: {{ position }} || Overflow: {{ overflow }}</w-title
    >

    <n-space size="small">
      <n-button @click="scrollRef?.scrollTo({ top: 800 })"
        >Scroll to 800px</n-button
      >
      <n-button @click="scrollRef?.scrollTo({ top: 1600 })"
        >Scroll to 1600px</n-button
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

    <w-title prefix="bar"
      >Horizontal Position: {{ positionHorizontal }} || Overflow:
      {{ overflowHorizontal }}</w-title
    >

    <n-space size="small">
      <n-button @click="scrollHorizontalRef?.scrollTo({ left: 800 })"
        >Scroll to 800px</n-button
      >
      <n-button @click="scrollHorizontalRef?.scrollTo({ left: 1600 })"
        >Scroll to 1600px</n-button
      >

      <n-button @click="scrollHorizontalRef?.scrollToStart()"
        >Scroll to Left</n-button
      >
      <n-button @click="scrollHorizontalRef?.scrollToEnd()"
        >Scroll to Right</n-button
      >

      <n-button @click="scrollHorizontalRef?.scrollToIndex(40)"
        >Scroll to index 40</n-button
      >

      <n-button @click="scrollHorizontalRef?.scrollToIndex(80)"
        >Scroll to index 80</n-button
      >
    </n-space>

    <div class="mt-2 border border-2 border-gray-600 rounded-sm h-12">
      <w-scrollbar
        ref="scrollHorizontalRef"
        v-model="positionHorizontal"
        x-scrollable
        height="100px"
        width="600px"
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
  import type { WScrollbarInst } from '@/components/Extra/Scrollbar'

  const position = ref(0)
  const positionHorizontal = ref(0)

  const overflow = ref(false)
  const overflowHorizontal = ref(false)

  const scrollRef = ref<Nullable<WScrollbarInst>>(null)
  const scrollHorizontalRef = ref<Nullable<WScrollbarInst>>(null)

  watch(
    () => position.value,
    () => {
      overflow.value = scrollRef.value?.getIsOverflow()!
    },
    { immediate: true }
  )

  watch(
    () => positionHorizontal.value,
    () => {
      overflowHorizontal.value = scrollHorizontalRef.value?.getIsOverflow()!
    },
    { immediate: true }
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'ScrollbarDemo',

    defaultView: false,
  })
</script>
