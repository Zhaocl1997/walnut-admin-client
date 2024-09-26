<script lang="ts" setup>
import type { ICompExtraJSONProps } from '.'

defineOptions({
  name: 'WCompExtraJSON',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ICompExtraJSONProps>(), {
  value: {},
  height: '100px',
  width: '100%',
  copy: true,
})

const jsonRef = shallowRef()
const getJSON = computed(() =>
  typeof props.value === 'string'
    ? JSON.stringify(JSON.parse(props.value), null, 2)
    : JSON.stringify(props.value, null, 2),
)

const isHovered = useElementHover(jsonRef)
</script>

<template>
  <WScrollbar :height="height" class="relative">
    <div ref="jsonRef">
      <n-code :code="getJSON" language="json" word-wrap :trim="false" />

      <WTransition v-if="copy" appear name="fade-right">
        <WCopy
          v-show="isHovered"
          :source="getJSON"
          class="absolute right-2 top-2"
        />
      </WTransition>
    </div>
  </WScrollbar>
</template>
