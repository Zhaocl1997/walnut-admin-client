<script lang="ts" setup>
import { formatTime } from 'easy-fns-ts'
import FlipItem from './item.vue'

const now = useNow({ interval: 500 })

const addAdapter = useAppStoreAdapter()

const getTimeArr = computed(() => {
  const one = formatTime(now.value, 'HH')
  const two = formatTime(now.value, 'mm')
  const three = formatTime(now.value, 'ss')

  return [
    parseInt(one.split('')[0]),
    parseInt(one.split('')[1]),
    parseInt(two.split('')[0]),
    parseInt(two.split('')[1]),
    parseInt(three.split('')[0]),
    parseInt(three.split('')[1]),
  ]
})
</script>

<template>
  <div class="flex items-center">
    <FlipItem :total="2" :current="getTimeArr[0]" />
    <FlipItem :total="9" :current="getTimeArr[1]" />

    <div
      class="h-[50px] px-[10px] flex justify-around flex-col"
      w:after="content-empty block w-[10px] h-[10px] bg-gray-400 rounded-full"
      w:before="content-empty block w-[10px] h-[10px] bg-gray-400 rounded-full"
    />

    <FlipItem :total="5" :current="getTimeArr[2]" />
    <FlipItem :total="9" :current="getTimeArr[3]" />

    <template v-if="!addAdapter.isMobile">
      <div
        class="h-[50px] px-[10px] flex justify-around flex-col"
        w:after="content-empty block w-[10px] h-[10px] bg-gray-400 rounded-full"
        w:before="content-empty block w-[10px] h-[10px] bg-gray-400 rounded-full"
      />

      <FlipItem :total="5" :current="getTimeArr[4]" />
      <FlipItem :total="9" :current="getTimeArr[5]" />
    </template>
  </div>
</template>
