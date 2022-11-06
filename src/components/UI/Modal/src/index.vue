<template>
  <n-modal
    ref="wModal"
    preset="card"
    :show="show"
    :show-icon="false"
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
      <w-title prefix="bar" :help-message="helpMessage">
        {{ title }}
      </w-title>
    </template>

    <template #header-extra v-if="fullscreen">
      <WAppFullScreen
        class="cursor-pointer leading-1 mr-2"
        size="18"
        :isFullscreen="isFullscreen"
        :click-event="onFullScreen"
      ></WAppFullScreen>
    </template>

    <template #>
      <w-scrollbar :height="height">
        <n-spin :show="loading">
          <slot></slot>
        </n-spin>
      </w-scrollbar>
    </template>

    <template #action>
      <n-space size="small" class="float-right" v-if="defaultButton">
        <n-button size="small" :onClick="onNo" :disabled="loading">
          {{ t('app.button.no') }}
        </n-button>

        <n-button
          size="small"
          type="primary"
          :onClick="onYes"
          :disabled="loading"
          :loading="loading"
        >
          {{ t('app.button.yes') }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
  import { toggleClass } from 'easy-fns-ts'
  import { useModalDraggable } from './hook/useModalDraggable'

  // TODO 888
  interface InternalProps {
    show?: boolean
    loading?: boolean
    title?: string
    helpMessage?: string
    width?: string | number
    height?: string | number
    draggable?: boolean
    fullscreen?: boolean
    defaultButton?: boolean
    segmented?: boolean
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    show: false,
    width: '25%',
    height: 'auto',
    draggable: true,
    fullscreen: true,
    defaultButton: true,
    segmented: true,
  })

  const emits = defineEmits(['yes', 'no', 'update:show'])

  const { t } = useAppI18n()

  const wModal = ref<Nullable<any>>(null)
  const isFullscreen = ref(false)

  watch(
    () => props.show,
    () => {
      if (props.draggable) {
        nextTick(() => {
          const dragEl =
            wModal.value?.containerRef.querySelector('.w-card-header')
          const dragDom = wModal.value?.containerRef.querySelector('.w-modal')

          useModalDraggable(dragEl, dragDom)
        })
      }
    }
  )

  const onFullScreen = () => {
    const dragDom = wModal.value?.containerRef.querySelector('.w-modal')

    isFullscreen.value = !isFullscreen.value

    toggleClass(dragDom, 'modal-fullscreen', isFullscreen.value)
  }

  const onNo = () => {
    emits('no')
  }

  const onYes = () => {
    emits('yes')
  }

  const onUpdateShow = (v: boolean) => {
    emits('update:show', v)

    if (!v) {
      onNo()
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WModal',
  })
</script>

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
