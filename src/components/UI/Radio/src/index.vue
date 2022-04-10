<script lang="tsx">
  import type { WRadioProps } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WRadio',

    props,

    emits: [],

    setup(props: WRadioProps, { attrs, slots, emit, expose }) {
      return () => (
        <n-radio-group name="radiogroup">
          {!props.button ? (
            <n-space>
              {props.options!.map((item) => (
                <n-radio key={item.value} {...item}>
                  {item.label}
                </n-radio>
              ))}
            </n-space>
          ) : (
            props.options!.map((item) => (
              <n-radio-button key={item.value} {...item}>
                {item.label}
              </n-radio-button>
            ))
          )}
        </n-radio-group>
      )
    },
  })
</script>
