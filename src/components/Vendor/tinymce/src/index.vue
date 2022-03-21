<template>
  <TinymceEditor
    ref="editorRef"
    v-model="editorValue"
    :id="tinymceId"
    :init="tinymceOptions"
    model-events="change keydown blur focus paste"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
  import type { Editor, RawEditorOptions } from 'tinymce'
  import tinymce from 'tinymce/tinymce'
  import TinymceEditor from '@tinymce/tinymce-vue'

  import { genString } from 'easy-fns-ts'

  import 'tinymce/themes/silver'
  import 'tinymce/models/dom/model'
  import 'tinymce/icons/default/icons'

  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/autoresize'
  import 'tinymce/plugins/autosave'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/template'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/save'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/importcss'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/quickbars'
  import 'tinymce/plugins/emoticons'

  interface TinymceEditorProps {
    value?: string
    disabled?: boolean
  }

  interface TinymceVueInstance {
    rerender: (p: RawEditorOptions) => void
  }

  const props = withDefaults(defineProps<TinymceEditorProps>(), {
    value: '',
    disabled: false,
  })

  const emits = defineEmits(['update:value'])

  const tinymceId = ref('t' + genString(8))
  const editorValue = ref()
  const editorRef = ref<Nullable<TinymceVueInstance>>(null)

  const { app } = useAppState()

  const getSkinName = computed(() =>
    app.value.isDark ? 'tinymce-5-dark' : 'tinymce-5'
  )

  const getLangName = computed(() => app.value.locale)

  const tinymceOptions = computed((): RawEditorOptions => {
    const publicPath = import.meta.env.VITE_PUBLIC_PATH

    return {
      selector: `#${tinymceId.value}`,

      // remove right bottom logo
      branding: false,

      // theme
      skin: getSkinName.value,
      skin_url: `${publicPath}vendor/tinymce/skins/ui/${getSkinName.value}`,
      content_css: `${publicPath}vendor/tinymce/skins/content/${getSkinName.value}/content.min.css`,

      // locale
      directionality: 'ltr',
      language: getLangName.value,
      language_url: `${publicPath}vendor/tinymce/langs/${getLangName.value}.js`,

      // settings
      plugins: `preview importcss searchreplace autolink autosave save directionality
         code visualblocks visualchars fullscreen image link media template
         codesample table charmap pagebreak nonbreaking anchor insertdatetime
         advlist lists wordcount help charmap quickbars`,

      menubar: 'file edit view insert format tools table help',

      toolbar: `undo redo |
        bold italic underline strikethrough |
        fontselect fontsizeselect formatselect |
        alignleft aligncenter alignright alignjustify |
        outdent indent |
        numlist bullist |
        forecolor backcolor removeformat |
        pagebreak |
        charmap emoticons |
        fullscreen preview save print |
        insertfile image media template link anchor codesample |
        ltr rtl`,

      // templates
      templates: [
        {
          title: 'Starting my story',
          description: 'A cure for writers block',
          content: 'Once upon a time...',
        },
        {
          title: 'New list with dates',
          description: 'New List with dates',
          content:
            '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
        },
      ],
    }
  })

  const onChange = () => {
    emits('update:value', editorValue.value)
  }

  onMounted(() => {
    tinymce.init({})
    editorValue.value = props.value
  })

  watch(
    () => [getSkinName, getLangName],
    () => {
      editorRef.value?.rerender(tinymceOptions.value)
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
