<script lang="ts" setup>
import type { MaybeElement } from '@vueuse/core'

const el = shallowRef<MaybeElement>()

const {
  play,
} = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' },
  ],
  {
    duration: 3000,
    iterations: 3,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
  },
)

play()
</script>

<script lang="ts">
export default defineComponent({
  name: 'Dashboard',
})
</script>

<template>
  <div class="h-16" @click="play">
    <div ref="el" class="from-pink-500 via-red-500 to-yellow-500 bg-gradient-to-r bg-clip-text text-center text-[128px] text-transparent font-extrabold uppercase dark:(from-indigo-200 via-red-200 to-yellow-100 bg-gradient-to-r)">
      dashboard
    </div>
  </div>
</template>
