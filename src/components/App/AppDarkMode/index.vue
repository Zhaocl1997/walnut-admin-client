<script lang="ts" setup>
</script>

<script lang="ts">
export default defineComponent({
  name: 'AppDarkMode',
})
</script>

<template>
  <div>
    <w-icon
      :icon="isDark ? 'carbon:moon' : 'carbon:sun'"
      width="24"
      @click="toggleDark"
    />
  </div>
</template>
