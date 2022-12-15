<script lang="ts" setup></script>

<script lang="ts">
export default defineComponent({
  name: 'FeatureActiveIcon',
})
</script>

<template>
  <div class="m-8">
    <n-alert title="Custom Active Icon" type="info">
      Can be enabled in
      <router-link to="/system/menu" #="{ navigate, href }" custom>
        <n-a :href="href" @click="navigate">
          Menu Management
        </n-a>
      </router-link>
    </n-alert>

    <n-h1>
      This feature supports a different icon when current route menu actived.
    </n-h1>

    <n-h1> Also supports for `category` menu active icon. </n-h1>

    <n-h1>
      Maybe normally used for what? I cannot image it, i just do it for fun...
    </n-h1>
  </div>
</template>
