<script lang="ts" setup>
import { toggleClass } from 'easy-fns-ts'
import { useModalDraggable } from './hook/useModalDraggable'

// TODO 888
interface InternalProps {
  show?: boolean
  loading?: boolean
  title?: string
  helpMessage?: string
  width?: string
  height?: string
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
        const dragEl
            = wModal.value?.containerRef.querySelector('.w-card-header')
        const dragDom = wModal.value?.containerRef.querySelector('.w-modal')

        useModalDraggable(dragEl, dragDom)
      })
    }
  },
)

function onFullScreen() {
  const dragDom = wModal.value?.containerRef.querySelector('.w-modal')

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
  emits('update:show', v)

  if (!v)
    onNo()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'WModal',
})
</script>

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

    <template v-if="fullscreen" #header-extra>
      <WAppFullScreen
        class="mr-2 cursor-pointer leading-1"
        size="18"
        :is-fullscreen="isFullscreen"
        :click-event="onFullScreen"
      />
    </template>

    <template #default>
      <w-scrollbar :height="height">
        <n-spin :show="loading">
          <slot />
        </n-spin>
      </w-scrollbar>
    </template>

    <template #action>
      <n-space v-if="defaultButton" size="small" class="float-right">
        <n-button size="small" :on-click="onNo" :disabled="loading">
          {{ t('app.button.no') }}
        </n-button>

        <n-button
          size="small"
          type="primary"
          :on-click="onYes"
          :disabled="loading"
          :loading="loading"
        >
          {{ t('app.button.yes') }}
        </n-button>
      </n-space>
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
