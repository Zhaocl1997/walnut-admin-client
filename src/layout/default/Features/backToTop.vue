<script lang="ts" setup>
const { currentRoute } = useAppRouter()

const showBackToTop = ref(true)

watch(
  () => currentRoute.value.name,
  () => {
    showBackToTop.value = false
    setTimeout(() => {
      showBackToTop.value = true
    }, 1000)
  },
  {
    immediate: true,
  },
)
</script>

<script lang="ts">
export default defineComponent({
  name: 'TheAppBackToTop',
})
</script>

<template>
  <n-back-top
    v-if="showBackToTop"
    :listen-to="`#${String($route.name)}`"
  />
</template>
