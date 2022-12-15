<script lang="ts" setup>
import { getTreeData } from '../data'
</script>

<script lang="ts">
export default defineComponent({
  name: 'JSONDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="JSON data display">
    <w-JSON :value="getTreeData()" height="400px" />
  </w-demo-card>
</template>
