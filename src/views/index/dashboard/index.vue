<script lang="ts" setup>
const state = ref()

const onClick = async (type: number) => {
  if (type === 1)
    await AppRouter.replace({ query: { a: 1 } })

  if (type === 2) {
    await AppRouter.replace({
      query: { b: { b1: '123', b2: 321, b3: false } },
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
  name: 'Dashboard',
})
</script>

<template>
  <div>
    dashboard

    {{ $route.query }}

    <n-button @click="onClick(1)">
      string/number
    </n-button>
    <n-button @click="onClick(2)">
      object
    </n-button>
    <n-button @click="onClick(3)">
      array
    </n-button>

    <div v-for="(item, index) in 500" :key="index">
      aabbccddeeff
    </div>
  </div>
</template>
