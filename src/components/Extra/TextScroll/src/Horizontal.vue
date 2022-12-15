<script lang="ts" setup>
interface HorizontalProps {
  texts: string[]
  speed: number
}

const props = defineProps<HorizontalProps>()

const container = ref<HTMLDivElement>()
const wrapper = ref<HTMLDivElement>()

const durationRef = ref(5000)
const wrapperWidthRef = ref(500)
const contentWidthRef = ref(500)

const getWrapperStyle = computed<CSSProperties>(() => ({
  position: 'relative',
  left: `${wrapperWidthRef.value}px`,
  animation: `text_scroll_horizontal ${durationRef.value}s linear infinite`,
  animationPlayState: 'running',
  animationFillMode: 'forwards',
}))

const getTranslateX = computed(
  () => `translateX(-${contentWidthRef.value}px)`,
)

onMounted(() => {
  let contentWidth = 0
  const containerWidth = container.value?.clientWidth!

  const children = wrapper.value?.children!

  if (children.length === 1) {
    contentWidth = children[0].scrollWidth * 4 + containerWidth
  }
  else {
    for (let i = 0; i < children?.length!; i++) {
      contentWidth += children[i].scrollWidth
      contentWidth += containerWidth
    }
  }

  contentWidth = contentWidth === 0 ? 500 : contentWidth

  const duration = (props.speed! * props.texts.length) / 1000

  durationRef.value = duration
  wrapperWidthRef.value = containerWidth
  contentWidthRef.value = contentWidth
})
</script>

<script lang="ts">
export default defineComponent({ name: 'TextScrollHorizontal' })
</script>

<template>
  <div>
    <div
      ref="container"
      class="overflow-hidden break-all whitespace-nowrap flex items-center"
    >
      <div
        ref="wrapper"
        :style="getWrapperStyle"
        class="hover:(!animate-paused !cursor-default)"
      >
        <span
          v-for="(item, index) in texts"
          :key="index"
          class="inline-block"
          :style="{ marginRight: `${wrapperWidthRef}px` }"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
  @keyframes text_scroll_horizontal {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: v-bind(getTranslateX);
    }
  }
</style>
