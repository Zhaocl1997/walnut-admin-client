<script lang="tsx">
  // This provider makes css vars like `var(--primary-color)` in naive
  // Accessable through all app
  // Class usage is achieved by windicss(now it's unocss), see more in unocss config
  export default defineComponent({
    name: 'ThemeProvider',

    setup(_, { slots }) {
      return () => <n-element>{() => slots.default?.()}</n-element>
    },
  })
</script>
