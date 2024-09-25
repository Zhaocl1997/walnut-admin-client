<script lang="ts" setup>
import { toggleClass } from 'easy-fns-ts'
import { useModalDraggable } from './useModalDraggable'
import type { ICompUIModalProps } from '.'

defineOptions({
  name: 'WModal',
})

const props = withDefaults(defineProps<ICompUIModalProps>(), {
  width: '25%',
  height: 'auto',
  draggable: true,
  fullscreen: true,
  defaultButton: true,
  segmented: true,
})

const emits = defineEmits<{ yes: [], no: [] }>()

const show = defineModel<boolean>('show', { required: true, default: false })

const modelRef = shallowRef()
const isFullscreen = ref(false)

watch(
  () => show.value,
  (v) => {
    if (v && props.draggable) {
      nextTick(() => {
        const dragEl
            = modelRef.value?.containerRef.querySelector('.w-card-header')
        const dragDom = modelRef.value?.containerRef.querySelector('.w-modal')

        useModalDraggable(dragEl, dragDom)
      })
    }
  },
)

function onFullScreen() {
  const dragDom = modelRef.value?.containerRef.querySelector('.w-modal')

  isFullscreen.value = !isFullscreen.value

  toggleClass(dragDom, 'modal-fullscreen', isFullscreen.value)
}

function onNo() {
  emits('no')
}

function onYes() {
  emits('yes')
}

function onUpdateShow(v: boolean) {
  show.value = v

  if (!v)
    onNo()
}
</script>

<template>
  <n-modal
    ref="modelRef"
    preset="card"
    :show="show"
    :show-icon="false"
    :auto-focus="false"
    :style="{ width }"
    :segmented="
      segmented
        ? {
          content: 'soft',
          footer: 'soft',
        }
        : {}
    "
    @update:show="onUpdateShow"
  >
    <template #header>
      <WTitle prefix="bar" :help-message="helpMessage">
        {{ title }}
      </WTitle>
    </template>

    <template v-if="fullscreen" #header-extra>
      <WAppFullScreen
        class="mr-2 cursor-pointer leading-1"
        size="18"
        :is-fullscreen="isFullscreen"
        :click-event="onFullScreen"
      />
    </template>

    <template #default>
      <WScrollbar :height="height">
        <n-spin :show="loading">
          <slot />
        </n-spin>
      </WScrollbar>
    </template>

    <template #action>
      <n-space v-if="defaultButton" size="small" class="float-right">
        <n-button size="small" :on-click="onNo" :disabled="loading">
          {{ $t('app.button.no') }}
        </n-button>

        <n-button
          size="small"
          type="primary"
          :on-click="onYes"
          :disabled="loading"
          :loading="loading"
        >
          {{ $t('app.button.yes') }}
        </n-button>
      </n-space>

      <slot name="action" />
    </template>
  </n-modal>
</template>

<style>
.modal-fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}
</style>
