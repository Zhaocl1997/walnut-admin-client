<template>
  <div class="w-dialog">
    <el-dialog v-bind="getBindValue" @close="onClose">
      <template #title>
        <w-title show-left>{{ getBindValue.title }}</w-title>
      </template>

      <div class="w-dialog__body max-h-96 overflow-y-auto">
        <slot></slot>
      </div>

      <template #footer>
        <el-space>
          <el-button size="small" @click="onCancel">{{
            t('component.dialog.cancel')
          }}</el-button>

          <el-button size="small" type="primary" @click="onConfirm">{{
            t('component.dialog.confirm')
          }}</el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WDialogProps } from './types'
  import { defineComponent, computed, unref } from 'vue'

  import props from './props'

  import { useI18n } from '/@/locales'
  import { useDialogProps } from './hooks/useDialogProps'
  import { useDialogVisible } from './hooks/useDialogVisible'
  import { useDialogMethods } from './hooks/useDialogMethods'

  export default defineComponent({
    name: 'WDialog',

    inheritAttrs: false,

    props: props,

    emits: ['hook', 'cancel', 'confirm'],

    setup(props: WDialogProps, ctx: SetupContext) {
      const { attrs, emit } = ctx

      const { t } = useI18n()

      const { setProps, getProps } = useDialogProps(props)

      const { visibleRef, onToggleVisible } = useDialogVisible()

      const dialogMethods = useDialogMethods({ setProps, onToggleVisible })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...unref(getProps),
          modelValue: visibleRef.value,
        }
      })

      const onCancel = () => {
        emit('cancel')
      }

      const onConfirm = () => {
        emit('confirm')
      }

      const onClose = () => {
        emit('cancel')
      }

      // create `useDialog` hook
      emit('hook', dialogMethods)

      return {
        t,
        getBindValue,
        onCancel,
        onConfirm,
        onClose,
        onToggleVisible,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-dialog {
    &:deep(.el-dialog__body) {
      padding: 24px 16px !important;
    }

    &:deep(.el-dialog__header) {
      border-bottom: 1px solid #e8eaec;
    }

    &:deep(.el-dialog__footer) {
      border-top: 1px solid #e8eaec;
    }
  }
</style>
