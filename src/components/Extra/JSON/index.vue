<template>
  <n-code
    :code="
      typeof value === 'string'
        ? JSON.stringify(JSON.parse(value), null, 2)
        : JSON.stringify(value)
    "
    language="json"
    word-wrap
    :trim="false"
  ></n-code>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WJSON',

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
    },

    setup() {},
  })
</script>
