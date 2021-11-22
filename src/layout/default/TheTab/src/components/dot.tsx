export default defineComponent({
  name: 'TabDot',

  setup(_, { expose }) {
    const bounce = ref(false)

    const start = () => {
      bounce.value = true
    }
    const stop = () => {
      bounce.value = false
    }

    expose({
      start,
      stop,
    })

    return () => (
      <div
        class={[
          'text-xl font-bold border-8 border-primary shadow-xl rounded-full h-4 w-4',
          'hover:border-primaryHover',
          { 'animate-bounce': bounce.value },
        ]}
      ></div>
    )
  },
})

export interface TabDotInst {
  start: Fn
  stop: Fn
}
