<script lang="ts">
  import type { AppContext } from './types'
  import { defineComponent, reactive, toRefs, watch } from 'vue'
  import { setAppContext } from './hooks/useAppContext'

  export default defineComponent({
    name: 'AppProvider',

    setup(_, { slots }) {
      const AppContext = reactive<AppContext>({
        app: {
          isDark: false,
          darkMode: 'light',
          locale: 'en',
          collapse: false,
          device: 'desktop',
          canShowAside: true,
          isMobile: false,
          showAside: false,
        },

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
        () => AppContext,
        (n) => {
          console.log('App Global State Changed!', n)
        },
        {
          deep: true,
          immediate: true,
        }
      )

      setAppContext(toRefs(AppContext))

      return () => slots.default?.()
    },
  })
</script>
