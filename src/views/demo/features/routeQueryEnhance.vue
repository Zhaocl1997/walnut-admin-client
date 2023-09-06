<script lang="ts" setup>
async function onClick(type: number) {
  if (type === 1)
    await AppRouter.replace({ query: { a: 1 } })

  if (type === 2) {
    await AppRouter.replace({
      query: { b: { b1: '123', b2: undefined, b3: false } },
    })
  }

  if (type === 3) {
    await AppRouter.replace({
      query: {
        c: [
          { c1: '123', c2: 321, c3: true },
          { c1: '123', c2: 321, c3: true },
        ],
      },
    })
  }
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'FeatureRouteQueryEnhance',
})
</script>

<template>
  <div class="m-8 children:mb-2">
    <n-alert title="Route Query Enhance" type="info">
      This is global settings, see app settings for more.
      Watch the query changes.
    </n-alert>

    <n-alert title="Notice" type="warning">
      Boolean value would be transformed into string after refresh the page.
    </n-alert>

    <n-space>
      <n-button @click="onClick(1)">
        string/number
      </n-button>
      <n-button @click="onClick(2)">
        object
      </n-button>
      <n-button @click="onClick(3)">
        array
      </n-button>
    </n-space>

    <div>
      <w-JSON
        :value="{
          query: $route.query,
        }" height="auto"
      />
    </div>
  </div>
</template>
