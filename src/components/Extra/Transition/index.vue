<script lang="ts" setup>
import { upperFirst } from 'lodash-es'
import type { RendererElement } from 'vue'
import type { ICompExtraTransitionProps } from '.'

defineOptions({
  name: 'WTransition',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ICompExtraTransitionProps>(), {
  name: 'fade',
  mode: 'out-in',
  group: false,
  appear: false,
  duration: 300,
})

function getActiveClass(m: 'In' | 'Out') {
  const isDash = props.name?.includes('-')
  if (isDash) {
    return (
      `animate__animated animate__${props.name?.split('-')[0] + m + upperFirst(props.name.split('-')[1])}`
    )
  }
  return `animate__animated animate__${props.name}${m}`
}

function onBeforeEnter(el: RendererElement) {
  el.style.animationDuration = `${props.duration / 1000}s`
}
</script>

<template>
  <TransitionGroup
    v-if="group"
    :enter-active-class="getActiveClass('In')"
    :leave-active-class="getActiveClass('Out')"
    :appear="appear"
    @before-enter="onBeforeEnter"
  >
    <slot />
  </TransitionGroup>
  <Transition
    v-else
    :mode="mode"
    :enter-active-class="getActiveClass('In')"
    :leave-active-class="getActiveClass('Out')"
    :appear="appear"
    @before-enter="onBeforeEnter"
  >
    <slot />
  </Transition>
</template>
