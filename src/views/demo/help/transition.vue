<template>
  <div>
    <w-select v-model="type" :options="options"></w-select>

    <el-button type="primary" class="ml-4" @click="onStart">Start</el-button>
    <component :is="`${type}Transition`">
      <div v-show="show" class="h-36 w-36 bg-red-400"></div>
    </component>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import {
    FadeTransition,
    ScaleTransition,
  } from '/@/components/Help/Transition'

  const list = [
    'Fade',
    'Scale',
    'SlideY',
    'ScrollY',
    'SlideYReverse',
    'ScrollYReverse',
    'SlideX',
    'ScrollX',
    'SlideXReverse',
    'ScrollXReverse',
    'ScaleRotate',
    'ExpandX',
    'Expand',
  ]

  const options = list.map(
    (item) =>
      ({
        value: item,
        label: item,
      } as OptionDataItem)
  )

  export default defineComponent({
    name: 'TransitionDemo',

    components: {
      FadeTransition,
      ScaleTransition,
    },

    setup() {
      const type = ref('Fade')
      const show = ref(true)

      const onStart = () => {
        show.value = false
        setTimeout(() => {
          show.value = true
        }, 300)
      }

      return {
        type,
        show,
        options,
        onStart,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
