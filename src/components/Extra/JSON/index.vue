<script lang="tsx">
  import type { PropType } from 'vue'

  import { genString } from 'easy-fns-ts'
  import { defineComponent, computed, ref, watchEffect } from 'vue'
  import { highlightSyntax } from './utils'

  export default defineComponent({
    name: 'WJSON',

    inheritAttrs: false,

    props: {
      value: {
        type: [Object, Array, String] as PropType<any>,
        default: '',
      },

      height: {
        type: String as PropType<string>,
        default: '100px',
      },

      width: {
        type: String as PropType<string>,
        default: '100%',
      },

      resizable: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },

    setup(props) {
      const id = genString(8)
      const widthRef = ref(0)

      const getStyle = computed((): any => {
        return {
          height: props.height,
          width: props.width,
          resize: props.resizable ? 'both' : 'none',
        }
      })

      watchEffect(
        () => {
          const target: HTMLElement = document.getElementById(id)!
          const perttierJSON = highlightSyntax(props.value)!
          target.innerHTML = perttierJSON

          widthRef.value = target.offsetWidth
        },
        { flush: 'post' }
      )

      return () => <pre id={id} style={getStyle.value} class="w-json-pre" />
    },
  })
</script>

<style lang="scss" scoped>
  .w-json-pre {
    position: relative;
  }

  .w-json-pre:deep() {
    padding: 5px;
    margin: 5px;
    outline: 1px solid #ccc;
    overflow-y: auto;
    line-height: 16px;

    .string {
      color: green !important;
    }

    .number {
      color: darkorange !important;
    }

    .boolean {
      color: blue !important;
    }

    .null {
      color: magenta !important;
    }

    .key {
      color: red !important;
    }

    .function {
      color: darkturquoise !important;
    }
  }
</style>
