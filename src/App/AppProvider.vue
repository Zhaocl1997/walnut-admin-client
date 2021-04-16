<script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue'
  import { useAppGlobalConfig } from './AppConfig'

  export default defineComponent({
    name: 'AppProvider',

    setup(_, { slots }) {
      const globalState = reactive({
        isDark: false,
        darkMode: 'light',
        arr: [
          {
            value: 1,
            name: 'aaa',
          },
          {
            value: 2,
            name: 'bbb',
          },
          {
            value: 3,
            name: 'ccc',
          },
        ],
      })

      watch(
        () => globalState,
        (n) => {
          console.log('App Global State Changed!', n)
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const { setAppGlobalConfig } = useAppGlobalConfig()

      setAppGlobalConfig(toRefs(globalState))

      return () => slots.default?.()
    },
  })
</script>
