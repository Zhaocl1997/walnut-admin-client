<template>
  <el-card>
    <template #header>
      <span>useDialog hook: </span>
    </template>

    <el-button @click="openDialog">Open Dialog</el-button>

    <w-dialog @hook="register" @cancel="closeDialog" @confirm="closeDialog">
      <h1 v-for="i in 50">title</h1>
    </w-dialog>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDialog } from '/@/components/UI/Dialog'

  export default defineComponent({
    name: 'UseDialogDemo',

    setup() {
      const [register, { openDialog, closeDialog }] = useDialog({
        title: 'Dialog Title',
      })

      return {
        register,
        openDialog,
        closeDialog,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
