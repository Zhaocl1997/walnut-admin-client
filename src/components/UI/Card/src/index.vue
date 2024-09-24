<script lang="tsx">
import { renderSlot } from 'vue'
import { props } from './props'

export default defineComponent({
  name: 'WCard',

  props,

  emits: ['refresh'],

  setup(props, { slots, emit }) {
    const show = ref(true)

    const onRefresh = () => {
      emit('refresh')
    }

    return () => (
      <n-card size="small">
        {{
          'default': () =>
            props.headerPreset === 'collapse'
              ? (
                  <n-collapse-transition show={show.value} class="px-2">
                    {renderSlot(slots, 'default')}
                  </n-collapse-transition>
                )
              : (
                  renderSlot(slots, 'default')
                ),
          'header-extra': () =>
            props.headerPreset === 'collapse'
              ? (
                  <w-arrow
                    active={show.value}
                    onClick={() => (show.value = !show.value)}
                  >
                  </w-arrow>
                )
              : props.headerPreset === 'refresh'
                ? (
                    <n-button text disabled={props.loading} loading={props.loading}>
                      <WIcon
                        icon="ant-design:sync-outlined"
                        width="20"
                        class="cursor-pointer"
                        onClick={onRefresh}
                      >
                      </WIcon>
                    </n-button>
                  )
                : null,
          'header': () => renderSlot(slots, 'header'),
          'footer': () => renderSlot(slots, 'footer'),
          'action': () => renderSlot(slots, 'action'),
        }}
      </n-card>
    )
  },
})
</script>
