<script lang="ts" setup>
defineOptions({
  name: 'FeatureRouteQueryEnhance',
})

async function onClick(type: number) {
  if (type === 1)
    await AppRouter.replace({ query: { q: JSON.stringify({ a: 1 }) } })

  if (type === 2) {
    await AppRouter.replace({
      query: { q: JSON.stringify({ b1: '123', b2: undefined, b3: false }) },
    })
  }

  if (type === 3) {
    await AppRouter.replace({
      query: {
        q: JSON.stringify([
          { c1: '123', c2: 321, c3: true },
          { c1: '123', c2: 321, c3: true },
        ]),
      },
    })
  }
}
</script>

<template>
  <div class="children:mb-2 !p-8">
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
      <WJSON
        :value="{
          query: $route.query.q ? JSON.parse($route.query.q as string) : {},
        }"
        height="auto"
      />
    </div>
  </div>
</template>
