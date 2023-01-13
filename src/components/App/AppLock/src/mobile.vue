<script lang="ts" setup>
import UnlockButton from './components/UnlockButton.vue'
import Network from './components/Network.vue'

const { level, charging } = useSharedBattery()
const now = useNow()

const getPercentLevel = computed(() => level.value * 100)
</script>

<template>
  <div class="relative w-full h-full m-auto overflow-hidden">
    <UnlockButton class="z-20" />

    <div class="absolute top-16 left-1/2 -translate-x-1/2 z-20">
      <div class="flex flex-col items-center gap-y-8">
        <n-time :time="now" format="yyyy/MM/dd" class="text-2xl tracking-wide" />
        <n-time :time="now" format="kk:mm" class="text-8xl tracking-wide" />
      </div>
    </div>

    <div class="absolute bottom-4 right-4 z-20">
      <Network />
    </div>

    <div class="abs-center z-10 text-white text-3xl">
      {{ getPercentLevel }}%
    </div>

    <div class="animate-hue-rotate contrast-[10] hue-rotate-0 w-full h-full bg-bodyColor overflow-hidden">
      <div
        class="w-full h-full relative box-border blur-[8px]"
        w:after="content-empty absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-[42%_38%_62%_49%/45%] bg-[#00ff6f] animate-wave-circle"
        w:before="content-empty absolute top-1/2 left-1/2 -translate-1/2 w-175px h-175px rounded-[50%] bg-black/95 z-10"
      />
      <ul class="g-bubbles absolute left-1/2 bottom-0 w-[100px] h-[40px] -translate-x-1/2 rounded-[100px_100px_0_0] bg-[#00ff6f] blur-[5px]">
        <template v-if="charging">
          <li v-for="i in 15" :key="i" class="list-none absolute rounded-[50%] bg-[#00ff6f]" />
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

@for $i from 0 through 15 {
  li:nth-child(#{$i}) {
    $width: 15+random(15)+px;
    left: 15 + random(70) + px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $width;
    height: $width;
    animation: moveToTop #{random(6) + 3}s ease-in-out -#{math.div(random(5000), 1000)}s infinite;
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }

  100% {
    opacity: .1;
    transform: translate(-50%, calc(0vh - 50vh + 100px));
  }
}
</style>
