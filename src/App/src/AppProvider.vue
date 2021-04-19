<script lang="ts">
  import type { AppContext } from './types'
  import { defineComponent, reactive, toRefs, watch } from 'vue'
  import { setAppContext } from './hooks/useAppContext'

  export default defineComponent({
    name: 'AppProvider',

    setup(_, { slots }) {
      const globalState = reactive<AppContext>({
        isDark: false,
        darkMode: 'light',
        locale: 'en',
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

      setAppContext(toRefs(globalState))

      return () => slots.default?.()
    },
  })
</script>
