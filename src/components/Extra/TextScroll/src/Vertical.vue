<script lang="ts" setup>
defineOptions({
  name: 'TextScrollVertical',
})

const props = withDefaults(defineProps<VerticalProps>(), { lineHeight: 28 })

interface VerticalProps {
  texts: string[]
  speed: number
  lineHeight?: number
}

let timer = 0
let innerTimer = 0
let time = 1
let position = 0

const positionRef = ref(0)

const wrapper = ref()
const isHovered = useElementHover(wrapper)

const total = computed(() => props.texts.length)

// TODO first item has bug
const getTexts = computed(() => {
  const data = props.texts!
  data.push(data[0])
  return data
})

function tick() {
  if (
    time % Math.round((props.speed / 1000) * 60) === 0
    && !isHovered.value
  ) {
    cancelAnimationFrame(innerTimer)
    innerTimer = requestAnimationFrame(scroll)
    time = 0
  }
  time++
  if (isHovered.value)
    time = 0

  cancelAnimationFrame(timer)
  timer = requestAnimationFrame(tick)
}

function scroll() {
  if (position % props.lineHeight !== 0) {
    positionRef.value = position + 1
    if (position > (total.value - 1) * props.lineHeight)
      position = 0

    cancelAnimationFrame(innerTimer)
    innerTimer = requestAnimationFrame(scroll)
  }
  else {
    cancelAnimationFrame(innerTimer)
  }
  position++
}

onMounted(() => {
  cancelAnimationFrame(innerTimer)
  timer = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(timer)
})
</script>

<template>
  <div ref="wrapper" class="flex content-start items-center">
    <div class="h-full w-full cursor-default overflow-hidden">
      <div class="relative w-full" :style="{ top: `-${positionRef}px` }">
        <div
          v-for="(item, index) in getTexts"
          :key="index"
          :title="item"
          :style="{ lineHeight: `${lineHeight}px` }"
          class="cursor-default overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
