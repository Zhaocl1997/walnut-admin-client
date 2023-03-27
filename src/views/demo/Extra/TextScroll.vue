<script lang="ts" setup>
const texts = [
  'aaaaaaaaaaaaa',
  'bbbbbbbbbbbbb',
  'ccccccccccccc',
  'ddddddddddddd',
  'eeeeeeeeeeeee',
]
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextScrollDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Text Scroll">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Horizontal
        </w-title>

        <n-space vertical>
          <WTextScroll :texts="texts" class="h-7 w-32 ring-1" />

          <WTextScroll :texts="texts" :speed="1000" class="h-7 w-32 ring-1" />

          <WTextScroll class="h-7 w-32 ring-1">
            a span
          </WTextScroll>

          <WTextScroll class="h-7 w-32 ring-1">
            use maxLength to controll scrolling
          </WTextScroll>

          <WTextScroll class="h-7 w-32 ring-1" :max-length="100">
            use maxLength to controll scrolling
          </WTextScroll>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Vertical
        </w-title>

        <n-space vertical>
          <WTextScroll mode="vertical" :texts="texts" class="h-7 w-32 ring-1" />

          <WTextScroll
            mode="vertical"
            :texts="texts"
            :speed="1000"
            class="h-7 w-32 ring-1"
          />

          <WTextScroll mode="vertical" class="h-7 w-32 ring-1">
            a span
          </WTextScroll>

          <WTextScroll mode="vertical" class="h-7 w-32 ring-1">
            use maxLength to controll scrolling
          </WTextScroll>

          <WTextScroll mode="vertical" class="h-7 w-32 ring-1" :max-length="100">
            use maxLength to controll scrolling
          </WTextScroll>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
