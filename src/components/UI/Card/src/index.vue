<script lang="tsx">
  import type { WCardProps } from './types'

  import { renderSlot } from 'vue'
  import { props } from './props'

  export default defineComponent({
    name: 'WCard',

    props,

    emits: [],

    setup(props: WCardProps, { slots }) {
      const show = ref(true)

      return () => (
        <n-card size="small">
          {{
            default: () => (
              <n-collapse-transition show={show.value} class="px-2">
                {renderSlot(slots, 'default')}
              </n-collapse-transition>
            ),
            ['header-extra']: () =>
              props.collapse ? (
                <w-arrow
                  active={show.value}
                  onClick={() => (show.value = !show.value)}
                ></w-arrow>
              ) : null,
            header: () => renderSlot(slots, 'header'),
            footer: () => renderSlot(slots, 'footer'),
            action: () => renderSlot(slots, 'action'),
          }}
        </n-card>
      )
    },
  })
</script>
