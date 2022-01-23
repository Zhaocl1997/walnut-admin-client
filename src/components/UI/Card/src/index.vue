<script lang="tsx">
  import type { WCardProps } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WCard',

    props,

    emits: [],

    setup(props: WCardProps, { slots }) {
      const show = ref(true)

      return () => (
        <n-card>
          {{
            default: () => (
              <n-collapse-transition show={show.value}>
                {slots.default!()}
              </n-collapse-transition>
            ),
            ['header-extra']: () =>
              props.collapse ? (
                <w-arrow
                  active={show.value}
                  onClick={() => (show.value = !show.value)}
                ></w-arrow>
              ) : null,
          }}
        </n-card>
      )
    },
  })
</script>
