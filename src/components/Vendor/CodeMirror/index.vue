<template>
  <div class="relative">
    <Codemirror
      :model-value="modelValue"
      :placeholder="placeholder"
      :style="{ height: height }"
      :autofocus="autofocus"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="disabled"
      :phrases="phrases"
      @ready="onReady"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @update="onUpdate"
    />

    <div class="w-full h-8 bg-bodyColor hstack justify-between px-2 text-xs">
      <div class="hstack justify-end items-center gap-4">
        <n-button text size="small" class="text-xs" @click="onUndo">
          {{ t('app.button.undo') }}
        </n-button>
        <n-button text size="small" class="text-xs" @click="onRedo">
          {{ t('app.button.redo') }}
        </n-button>
        <n-button text size="small" class="text-xs" @click="onSearch">
          {{ t('app.button.search') }}
        </n-button>
      </div>

      <div class="hstack justify-end items-center gap-4">
        <div>{{ t('app.base.length') }}: {{ infos.length }}</div>
        <div>{{ t('app.base.lines') }}: {{ infos.lines }}</div>
        <div>{{ t('app.base.cursor') }}: {{ infos.cursor }}</div>
        <div>{{ t('app.base.selected') }}: {{ infos.selected }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror'

  import { EditorView, ViewUpdate } from '@codemirror/view'
  import { oneDark } from '@codemirror/theme-one-dark'
  import { redo, undo } from '@codemirror/commands'
  import { openSearchPanel, closeSearchPanel } from '@codemirror/search'

  import { languages } from './language'

  interface InternalProps {
    modelValue: string
    placeholder?: string
    disabled?: boolean
    height?: string
    autofocus?: boolean
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    placeholder: 'Code goes here...',
    height: '300px',
    autofocus: false,
  })
  const emits = defineEmits(['update:modelValue', 'blur', 'focus'])

  const { t } = useAppI18n()

  const infos = ref<{
    selected: number
    cursor: number
    length: number
    lines: number
  }>({
    selected: 0,
    cursor: 0,
    length: 0,
    lines: 0,
  })

  const searchPanelOpen = ref(false)
  const phrases = ref()

  const appDark = useAppStoreDark()
  const appLocale = useAppStoreLocale()

  watch(
    () => appLocale.locale,
    async (v) => {
      const modules = import.meta.glob(
        '/public/vendor/codeMirror/langs/zh-CN.js'
      )

      for (const path in modules) {
        const res = (await modules[path]()) as { default: Recordable }

        if (v === AppConstLocale.ZH_CN) {
          phrases.value = res.default
        } else {
          phrases.value = {}
        }
      }
    },
    {
      immediate: true,
    }
  )

  const extensions = computed(() =>
    appDark.isDark ? [...languages, oneDark] : languages
  )

  // @codemirror/view
  const view = shallowRef<EditorView>()

  const onReady = (payload: any) => {
    view.value = payload.view
  }

  const onChange = (v: string, e: ViewUpdate) => {
    emits('update:modelValue', v)
  }

  const onFocus = (e: ViewUpdate) => {
    emits('focus', e)
  }

  const onBlur = (e: ViewUpdate) => {
    emits('blur', e)
  }

  const onUpdate = (e: ViewUpdate) => {
    const ranges = e.state.selection.ranges

    infos.value!.selected = ranges.reduce(
      (plus, range) => plus + range.to - range.from,
      0
    )
    infos.value!.cursor = ranges[0].anchor
    infos.value!.length = e.state.doc.length
    infos.value!.lines = e.state.doc.lines
  }

  const onUndo = () => {
    undo({
      state: view.value!.state,
      dispatch: view.value!.dispatch,
    })
  }

  const onRedo = () => {
    redo({
      state: view.value!.state,
      dispatch: view.value!.dispatch,
    })
  }

  const onSearch = () => {
    if (!searchPanelOpen.value) {
      openSearchPanel(view.value!)
    } else {
      closeSearchPanel(view.value!)
    }

    searchPanelOpen.value = !searchPanelOpen.value
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorCodeMirror',
  })
</script>
