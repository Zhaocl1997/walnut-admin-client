<template>
  <el-card>
    <template #header>
      <span>ScrollBar：</span>
    </template>

    <el-button @click="scrollTo(800)">Scroll to 800px position</el-button>
    <el-button @click="scrollTo(1600)">Scroll to 1600px position</el-button>

    <br />
    <br />

    <el-button @click="scrollToTop">Scroll to Top</el-button>
    <el-button @click="scrollToBottom">Scroll to Bottom</el-button>

    <br />
    <br />

    <el-button @click="scrollToAdvanced({ index: 20 })"
      >Scroll to index 20</el-button
    >

    <el-button @click="scrollToAdvanced({ index: 60 })"
      >Scroll to index 60</el-button
    >

    <br />
    <br />

    <w-title show-left>Horizontal(default)</w-title>

    <div class="h-56 border border-2 border-gray-600 rounded-sm">
      <w-scrollbar ref="scrollRef">
        <div v-for="(i, index) in 100" :key="i" class="text-3xl my-3">
          Horizontal-{{ index }}
        </div>
      </w-scrollbar>
    </div>

    <el-divider></el-divider>

    <el-button @click="scrollToVertical(1600)"
      >Scroll to 1600px position</el-button
    >
    <el-button @click="scrollToVertical(3200)"
      >Scroll to 3200px position</el-button
    >

    <br />
    <br />

    <el-button @click="scrollToStartVertical">Scroll to Left</el-button>
    <el-button @click="scrollToEndVertical">Scroll to Right</el-button>

    <br />
    <br />

    <el-button @click="scrollToAdvancedVertical({ index: 20 })"
      >Scroll to index 20</el-button
    >

    <el-button @click="scrollToAdvancedVertical({ index: 60 })"
      >Scroll to index 60</el-button
    >

    <br />
    <br />

    <w-title show-left>Vertical</w-title>

    <div class="border border-2 border-gray-600 rounded-sm h-12">
      <w-scrollbar ref="scrollVerticalRef" vertical>
        <div class="flex flex-row flex-nowrap whitespace-nowrap">
          <div v-for="(i, index) in 100" :key="i" class="text-3xl mx-3">
            Vertical-{{ index }}
          </div>
        </div>
      </w-scrollbar>
    </div>
  </el-card>
</template>

<script lang="ts">
  import type { WScrollbarRef } from '/@/components/UI/Scrollbar'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'ScrollDemo',

    setup() {
      const scrollRef = ref<Nullable<WScrollbarRef>>(null)
      const scrollVerticalRef = ref<Nullable<WScrollbarRef>>(null)

      // default horizontal
      const scrollTo = (to: number) => {
        scrollRef.value!.scrollTo(to)
      }

      const scrollToTop = () => {
        scrollRef.value!.scrollToStart()
      }

      const scrollToBottom = () => {
        scrollRef.value!.scrollToEnd()
      }

      const scrollToAdvanced = (args: { index: number }) => {
        scrollRef.value!.scrollToAdvanced(args)
      }

      // vertival
      const scrollToVertical = (to: number) => {
        scrollVerticalRef.value!.scrollTo(to)
      }

      const scrollToStartVertical = () => {
        scrollVerticalRef.value!.scrollToStart()
      }

      const scrollToEndVertical = () => {
        scrollVerticalRef.value!.scrollToEnd()
      }

      const scrollToAdvancedVertical = (args: { index: number }) => {
        scrollVerticalRef.value!.scrollToAdvanced(args)
      }

      return {
        scrollRef,
        scrollVerticalRef,

        scrollTo,
        scrollToTop,
        scrollToBottom,
        scrollToAdvanced,

        scrollToVertical,
        scrollToStartVertical,
        scrollToEndVertical,
        scrollToAdvancedVertical,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
