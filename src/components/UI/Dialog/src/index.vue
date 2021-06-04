<template>
  <div ref="wDialogRef" class="w-dialog">
    <el-dialog v-bind="getBindValue" @close="emit('cancel')">
      <template #title v-if="!$slots.title">
        <w-title show-left>{{ getBindValue.title }}</w-title>
      </template>

      <div class="w-dialog__body max-h-96 overflow-y-auto">
        <slot></slot>
      </div>

      <template #footer v-if="!$slots.footer">
        <el-space>
          <el-button size="small" @click="emit('cancel')">{{
            t('component.base.action.cancel')
          }}</el-button>

          <el-button size="small" type="primary" @click="emit('confirm')">{{
            t('component.base.action.confirm')
          }}</el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import type { WDialogProps } from './types'

  import { defineComponent, computed, unref, nextTick, ref } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useI18n } from '/@/locales'
  import { useProps } from '/@/hooks/core/useProps'

  import { useDialogVisible } from './hooks/useDialogVisible'
  import { useDialogMethods } from './hooks/useDialogMethods'
  import { useDialogDrag } from './hooks/useDialogDrag'

  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WDialog',

    inheritAttrs: false,

    props: props,

    emits: ['hook', 'cancel', 'confirm'],

    setup(props: WDialogProps, ctx) {
      const { attrs, emit } = ctx

      const { t } = useI18n()

      const wDialogRef = ref<Nullable<HTMLElement>>(null)

      const { setProps, getProps } = useProps<WDialogProps>(props)

      const { visibleRef, onToggleVisible } = useDialogVisible()

      const dialogMethods = useDialogMethods({ setProps, onToggleVisible })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...easyOmit(unref(getProps), extendPropKeys),
          modelValue: visibleRef.value,
        } as WDialogProps
      })

      // create `useDialog` hook
      emit('hook', dialogMethods)

      nextTick(() => {
        useDialogDrag(wDialogRef)
      })

      return {
        wDialogRef,
        t,
        emit,
        getBindValue,
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
