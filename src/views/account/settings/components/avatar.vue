<template>
  <n-avatar
    :style="{ height: size + 'px', width: size + 'px' }"
    :src="user.userInfo.avatar"
    circle
    alt="avatar"
  ></n-avatar>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ size?: number }>(), { size: 24 })

  const { user } = useAppState()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatar',
  })
</script>
