<template>
  <el-card>
    <template #header>
      <span>ClickOutSide：</span>
    </template>

    <div
      class="w-full h-64 bg-blue-200 flex items-center"
      v-click-outside="onClickOutside"
      @click="onClick"
    >
      <span class="font-sans text-4xl font-black m-auto">{{ text }}</span>
    </div>

    <br />
    <br />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'ClickOutsideDemo',

    setup() {
      const text = ref('Click')

      const onClick = () => {
        text.value = 'Click inside!'
      }

      const onClickOutside = () => {
        text.value = 'Click outside!'
      }

      return { text, onClick, onClickOutside }
    },
  })
</script>

<style lang="scss" scoped></style>
