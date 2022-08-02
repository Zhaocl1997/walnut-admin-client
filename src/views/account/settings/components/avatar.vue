<template>
  <n-avatar
    :style="{ height: size + 'px', width: size + 'px' }"
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

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ value?: string; size?: number }>(), {
    size: 24,
  })

  const userProfile = useAppStoreUserProfile()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatar',
  })
</script>
