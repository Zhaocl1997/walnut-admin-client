<template>
  <n-spin :show="loading" class="w-full">
    <TinymceEditor
      ref="editorRef"
      v-model="editorValue"
      :id="editorId"
      :init="tinymceOptions"
      model-events="change keydown blur focus paste"
      @change="onChange"
      :tinymce-script-src="cdnUrl"
      :disabled="disabled"
    />
  </n-spin>
</template>

<script lang="ts" setup>
  import type { RawEditorOptions } from 'tinymce'
  import TinymceEditor from '@tinymce/tinymce-vue'
  import { genString } from 'easy-fns-ts'

  import {
    cdnUrl,
    modelUrl,
    themeUrl,
    iconsUrl,
    getSkinUrl,
    getContenteCSSUrl,
  } from './resources/cdn'
  import { plugins } from './resources/plugins'
  import { toolbar } from './resources/toolbar'
  import { menubar } from './resources/menubar'
  import { templates } from './resources/template'

  interface InsideProps {
    value?: string
    disabled?: boolean
    height?: string
    width?: string
  }

  interface TinymceVueInstance {
    rerender: (p: RawEditorOptions) => void
  }

  const props = withDefaults(defineProps<InsideProps>(), {
    value: '',
    disabled: false,
    width: '100%',
  })

  const emits = defineEmits(['update:value'])

  const editorId = ref('tinymce-' + genString(8))
  const editorValue = ref('')
  const editorRef = ref<Nullable<TinymceVueInstance>>(null)

  const loading = ref(false)

  const { app } = useAppState()

  const getSkinName = computed(() =>
    app.value.isDark ? 'tinymce-5-dark' : 'tinymce-5'
  )

  const getLangName = computed(() => app.value.locale)

  const tinymceOptions = computed((): RawEditorOptions => {
    const publicPath = import.meta.env.VITE_PUBLIC_PATH

    return {
      selector: `#${editorId.value}`,

      // remove right bottom logo
      branding: false,

      height: props.height,
      width: props.width,

      // ban paste image directly into editor
      paste_data_images: false,

      // theme
      skin: getSkinName.value,
      model_url: modelUrl,
      theme_url: themeUrl,
      icons_url: iconsUrl,
      skin_url: getSkinUrl(getSkinName.value),
      content_css: getContenteCSSUrl(getSkinName.value),

      // locale
      directionality: 'ltr',
      language: getLangName.value,
      language_url: `${publicPath}vendor/tinymce/langs/${getLangName.value}.js`,

      // settings
      plugins,
      menubar,
      toolbar,

      // templates
      templates,
    }
  })

  const onChange = () => {
    emits('update:value', editorValue.value)
  }

  onMounted(() => {
    loading.value = true
    nextTick(() => {
      editorValue.value = props.value
      loading.value = false
    })
  })

  watch(
    () => [getSkinName, getLangName],
    () => {
      loading.value = true

      editorRef.value?.rerender(tinymceOptions.value)

      setTimeout(() => {
        loading.value = false
      }, 500)
    },
    {
      deep: true,
      immediate: true,
    }
  )
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TinymceEditor',
  })
</script>
