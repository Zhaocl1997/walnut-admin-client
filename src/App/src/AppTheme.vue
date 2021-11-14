<script lang="tsx">
  // This provider makes css vars like `var(--primary-color)` in naive
  // Accessable through all app
  // Class usage is achieved by windicss, see more in `tailwind.config.ts`
  export default defineComponent({
    name: 'ThemeProvider',

    setup(_, { slots }) {
      return () => <n-element>{() => slots.default?.()}</n-element>
    },
  })
</script>
