<script lang="ts" setup>
defineOptions({
  name: 'WAvatar',
  defaultView: false,
})

withDefaults(defineProps<{ value?: string, size?: number }>(), {
  size: 24,
})

const userProfile = useAppStoreUserProfile()
</script>

<template>
  <n-avatar
    :style="{ height: `${size}px`, width: `${size}px` }"
    :src="value ?? userProfile.getAvatar"
    circle
    alt="avatar"
    object-fit="cover"
  >
    <span v-if="!value && !userProfile.getAvatar">
      {{ userProfile.getDisplayName }}
    </span>
  </n-avatar>
</template>
