<script lang="ts" setup>
import type { IconifyIconLoaderAbort } from '@iconify/vue'
import type { ICompUIIconProps } from '.'
import { Icon, iconExists, loadIcons } from '@iconify/vue'

defineOptions({
  name: 'WCompUIIcon',
})

const props = withDefaults(defineProps<ICompUIIconProps>(), { inline: true })

// Variable to store function to cancel loading
const loader = ref<IconifyIconLoaderAbort>()

// Icon status
const loaded = ref<boolean>()

const getSize = computed(() =>
  Number.parseInt(props.width as string || props.height as string || '16'),
)

// Function to check if icon data is available
function check(icon: string) {
  const isLoaded = (loaded.value = iconExists(icon))

  // Cancel old loder
  if (loader.value) {
    loader.value()
    loader.value = undefined
  }

  if (!isLoaded) {
    loader.value = loadIcons([icon], () => {
      loaded.value = iconExists(icon)
    })
  }
}

watch(
  () => props.icon,
  (v) => {
    check(v as string)
  },
  { immediate: true },
)

onUnmounted(() => {
  if (loader.value)
    loader.value()
})
</script>

<template>
  <NSkeleton
    v-if="!loaded"
    :animated="false"
    circle
    :width="getSize"
    :height="getSize"
    class="inline-block"
  />
  <Icon v-else v-bind="props" />
</template>

<style scoped>
svg {
  outline: none !important;
}
</style>
