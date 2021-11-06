<template>
  <router-view>
    <template #="{ Component, route }">
      <div :id="route.name">
        <component :is="Component" />
      </div>
    </template>
  </router-view>
</template>
