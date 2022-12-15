<script lang="ts">
import { props } from './props'

export default defineComponent({
  name: 'WColorPicker',

  props,

  setup(props) {
    return {}
  },
})
</script>

<template>
  <n-color-picker show-preview />
</template>
