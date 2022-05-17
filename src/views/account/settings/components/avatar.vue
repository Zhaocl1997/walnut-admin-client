<template>
  <n-avatar
    :style="{ height: size + 'px', width: size + 'px' }"
    :src="value ?? user.userInfo.avatar"
    circle
    alt="avatar"
    object-fit="cover"
  >
    <span v-if="!value && !user.userInfo.avatar">
      {{ user.userInfo.nickName ?? user.userInfo.userName }}
    </span>
  </n-avatar>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ value?: string; size?: number }>(), {
    size: 24,
  })

  const { user } = useAppState()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatar',
  })
</script>
