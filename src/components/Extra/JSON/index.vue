<script lang="ts" setup>
defineOptions({
  name: 'WJSON',
})

const props = withDefaults(defineProps<InternalProps>(), {
  value: {},
  height: '100px',
  width: '100%',
})

// TODO 888
interface InternalProps {
  value?: any
  height?: string
  width?: string
}

const jsonRef = ref()
const getJSON = computed(() =>
  typeof props.value === 'string'
    ? JSON.stringify(JSON.parse(props.value), null, 2)
    : JSON.stringify(props.value, null, 2),
)

const isHovered = useElementHover(jsonRef)
</script>

<template>
  <w-scrollbar :height="height">
    <div ref="jsonRef" class="relative">
      <n-code :code="getJSON" language="json" word-wrap :trim="false" />

      <w-transition appear name="fade-right">
        <w-copy
          v-show="isHovered"
          :source="getJSON"
          class="absolute right-2 top-2"
        />
      </w-transition>
    </div>
  </w-scrollbar>
</template>
