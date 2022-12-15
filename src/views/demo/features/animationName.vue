<script lang="ts" setup></script>

<script lang="ts">
export default defineComponent({
  name: 'FeatureAnimationName',
})
</script>

<template>
  <div class="m-8">
    <n-alert title="Global Config" type="warning">
      There is global config to limit. Only when `transitionStatus` is true and
      `transitionMode` is `scope`, this feature can work correctly.
    </n-alert>

    <br>

    <n-alert title="Custom Animation Name" type="info">
      Can be enabled in
      <router-link to="/system/menu" #="{ navigate, href }" custom>
        <n-a :href="href" @click="navigate">
          Menu Management
        </n-a>
      </router-link>
    </n-alert>

    <n-h1>
      This feature supports to custom the transition name for this route.
    </n-h1>

    <n-h1>
      Maybe normally used for highly customizable configuration for developers
    </n-h1>
  </div>
</template>
