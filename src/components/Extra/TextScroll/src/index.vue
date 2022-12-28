<script lang="tsx">
import { props } from './props'

export default defineComponent({
  name: 'TextScroll',

  components: {
    TextScrollHorizontal: createAsyncComponent(
      () => import('./Horizontal.vue'),
    ),
    TextScrollVertical: createAsyncComponent(() => import('./Vertical.vue')),
  },

  props,

  setup(props, { slots }) {
    return () => {
      const slotsText = getDefaultSlotText(slots)

      const getTexts = slotsText
        ? slotsText.length > props.maxLength
          ? Array.from({ length: 4 }, () => slotsText)
          : [slotsText]
        : props.texts

      if (slotsText && slotsText.length < props.maxLength) {
        return <span>{slotsText}</span>
      }
      else {
        return props.mode === 'horizontal'
          ? (
            <TextScrollHorizontal
              {...props}
              texts={getTexts}
            ></TextScrollHorizontal>
            )
          : (
            // TODO vertical need optimise
            <TextScrollVertical
              {...props}
              texts={getTexts}
            ></TextScrollVertical>
            )
      }
    }
  },
})
</script>
