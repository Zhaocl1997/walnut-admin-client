<script lang="tsx">
import type { IconifyIconLoaderAbort } from '@iconify/vue'
import { Icon, iconExists, loadIcons } from '@iconify/vue'
import { defineComponent, ref } from 'vue'
import { NSkeleton } from 'naive-ui'

import { props } from './props'

export default defineComponent({
  name: 'WIcon',
  components: {
    Icon,
  },
  props,
  setup(props) {
    // Variable to store function to cancel loading
    const loader = ref<Nullable<IconifyIconLoaderAbort>>(null)

    // Icon status
    const loaded = ref<Nullable<boolean>>(null)

    // Function to check if icon data is available
    const check = (icon: string) => {
      const isLoaded = (loaded.value = iconExists(icon))

      // Cancel old loder
      if (loader.value) {
        loader.value()
        loader.value = null
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
        check(v!)
      },
      { immediate: true },
    )

    tryOnUnmounted(() => {
      if (loader.value)
        loader.value()
    })

    const getSize = computed(() =>
      Number.parseInt(props.width! || props.height! || '16'),
    )

    return () => {
      if (!props.icon)
        return null

      if (loaded.value) {
        return <Icon {...props}></Icon>
      }
      else {
        return (
          <NSkeleton
            animated={false}
            circle
            width={getSize.value}
            height={getSize.value}
            class="inline-block"
          >
          </NSkeleton>
        )
      }
    }
  },
})
</script>

<style scoped>
  :focus {
  outline: none;
}
</style>
