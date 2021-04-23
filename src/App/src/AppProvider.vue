<script lang="ts">
  import { defineComponent, toRefs, watch } from 'vue'
  import { setAppContext } from './hooks/useAppContext'
  import { AppGlobalContext } from '/@/store/ctx'

  export default defineComponent({
    name: 'AppProvider',

    setup(_, { slots }) {
      watch(
        () => AppGlobalContext,
        (n) => {
          console.groupCollapsed('App Context Changed!')
          console.log(n)
          console.groupEnd()
        },
        {
          deep: true,
          immediate: true,
        }
      )

      setAppContext(toRefs(AppGlobalContext))

      return () => slots.default?.()
    },
  })
</script>
