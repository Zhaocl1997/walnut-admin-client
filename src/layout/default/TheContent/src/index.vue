<template>
  <router-view>
    <template #="{ Component, route }">
      <div :id="route.name" class="h-full">
        <component :is="Component" />
      </div>
    </template>
  </router-view>
</template>
