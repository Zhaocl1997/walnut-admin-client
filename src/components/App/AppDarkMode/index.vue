<script lang="ts" setup>
defineOptions({
  name: 'AppDarkMode',
})
</script>

<template>
  <div>
    <WIcon :icon="isDark ? 'carbon:moon' : 'carbon:sun'" width="24" @click="toggleDark" />
  </div>
</template>
