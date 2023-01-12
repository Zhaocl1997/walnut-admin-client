<script lang="ts" setup>
import UnlockButton from './components/UnlockButton.vue'
import Network from './components/Network.vue'

interface InternalProps {
  size?: number
}

const props = withDefaults(defineProps<InternalProps>(), { size: 200 })

const { level, charging } = useSharedBattery()
const now = useNow()

const getPercentLevel = computed(() => level.value * 100)

const getSize = computed(() => `${props.size}px`)
const getHalf = computed(() => `${props.size / 2}px`)
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

    <div class="g-contrast">
      <div class="g-circle " />
      <ul v-if="charging" class="g-bubbles">
        <li v-for="i in 15" :key="i" />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

.g-contrast {
    filter: contrast(10) hue-rotate(0);
    width: 100%;
    height: 100%;
    background-color: var(--body-color);
    overflow: hidden;
    animation: hueRotate 10s infinite linear;
}

.g-circle {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    filter: blur(8px);

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0);
        width: v-bind(getSize);
        height: v-bind(getSize);
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        animation: circle-rotate 10s infinite linear;
    }

    &::before {
        content: "";
        position: absolute;
        width: calc(v-bind(getSize) - 24px);
        height: calc(v-bind(getSize) - 24px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: #000;
        z-index: 10;
    }
}

.g-bubbles {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100px;
    height: 40px;
    transform: translate(-50%, 0);
    border-radius: 100px 100px 0 0;
    background-color: #00ff6f;
    filter: blur(5px);
}

li {
    list-style: none;
    position: absolute;
    border-radius: 50%;
    background: #00ff6f;
}

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

@keyframes circle-rotate {
    50% {
        border-radius: 45% / 42% 38% 58% 49%;
    }

    100% {
        transform: translate(-50%, -50%) rotate(720deg);
    }
}

@keyframes moveToTop {
    90% {
        opacity: 1;
    }

    100% {
        opacity: .1;
        transform: translate(-50%, calc(0vh - 50vh + v-bind(getHalf)));
    }
}

@keyframes hueRotate {
    100% {
        filter: contrast(15) hue-rotate(360deg);
    }
}
</style>
