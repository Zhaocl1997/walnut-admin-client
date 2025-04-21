<script lang="ts" setup>
import type { RawEditorOptions } from 'tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'

import { genString } from 'easy-fns-ts'
import tinymce from 'tinymce/tinymce'
import { getContenteCSSUrl, getSkinUrl } from './resources/cdn'
import { menubar } from './resources/menubar'
import { plugins } from './resources/plugins'
import { templates } from './resources/template'
import { toolbar } from './resources/toolbar'
import 'tinymce/themes/silver'
import 'tinymce/models/dom'
import 'tinymce/icons/default'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/emoticons/js/emojis'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'

import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

defineOptions({
  name: 'WVendorTinymceEditor',
})

const props = withDefaults(defineProps<InternalProps>(), {
  value: '',
  disabled: false,
  width: '100%',
})

const emits = defineEmits(['update:value'])

// TODO 888
interface InternalProps {
  value?: string
  disabled?: boolean
  height?: string
  width?: string
}

interface TinymceVueInstance {
  rerender: (p: RawEditorOptions) => void
}

const editorId = ref(`tinymce-${genString(8)}`)
const editorValue = ref('')
// third party libs should use shallowRef !!!
const editorRef = shallowRef<Nullable<TinymceVueInstance>>(null)

const loading = ref(false)

const appLocale = useAppStoreLocale()
const { publicPath } = useAppEnv('build')

const getSkinName = computed(() =>
  isDark.value ? 'tinymce-5-dark' : 'tinymce-5',
)

const getLangName = computed(() => appLocale.locale)

const tinymceOptions = computed((): RawEditorOptions => {
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

function onChange() {
  emits('update:value', editorValue.value)
}

onMounted(() => {
  tinymce.init({})

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
  },
)
</script>

<template>
  <n-spin :show="loading" class="w-full">
    <TinymceEditor
      :id="editorId"
      ref="editorRef"
      v-model="editorValue"
      :init="tinymceOptions"
      model-events="change keydown blur focus paste"
      :disabled="disabled"
      @change="onChange"
    />
  </n-spin>
</template>
