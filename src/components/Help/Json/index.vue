<template>
  <pre :id="id" class="w-json-pre" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
  import { genString } from 'easy-fns-ts'
  import type { PropType } from 'vue'
  import { defineComponent, watch, onMounted, nextTick } from 'vue'

  export default defineComponent({
    name: 'WJSon',

    inheritAttrs: false,

    props: {
      value: {
        type: [Object, Array, String] as PropType<any>,
        default: '',
      },

      height: {
        type: String as PropType<string>,
        default: '200px',
      },

      width: {
        type: String as PropType<string>,
        default: '100%',
      },
    },

    setup(props) {
      const id = genString(8)

      watch(
        () => props.value,
        () => {
          init()
        },
        {
          deep: true,
        }
      )

      const onSyntaxHighlight = (json: string) => {
        if (!json) {
          return
        }

        if (typeof json != 'string') {
          json = JSON.stringify(
            json,
            (key, value) => {
              return typeof value === 'function' ? value + '' : value
            },
            2
          )
        }

        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')

        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|function|=>)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          (match) => {
            let cls = 'number'
            if (/function|=>/.test(match)) {
              cls = 'function'
            } else if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key'
              } else {
                cls = 'string'
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean'
            } else if (/null/.test(match)) {
              cls = 'null'
            }

            return `<span class="${cls}">${match}</span>`
          }
        )
      }

      const init = () => {
        nextTick(() => {
          const target: HTMLElement = document.getElementById(id)!
          const perttierJSON = onSyntaxHighlight(props.value)!
          target.innerHTML = perttierJSON
        })
      }

      onMounted(() => {
        init()
      })

      return {
        id,
      }
    },
  })
</script>

<style lang="scss" scoped>
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
