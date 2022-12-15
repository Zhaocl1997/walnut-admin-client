<script lang="ts" setup>
import type { WDropdown } from './types'

// avoid error
interface WDropdownProps extends WDropdown.Props {}
interface WDropdownEmits extends WDropdown.Emit.Entry {}

const props = defineProps<WDropdownProps>()
const emit = defineEmits<WDropdownEmits>()

const { setProps, getProps } = useProps<WDropdown.Props>(props)

const show = ref(false)
const x = ref(0)
const y = ref(0)

const openDropdown = (e: MouseEvent) => {
  x.value = e.clientX
  y.value = e.clientY
  show.value = true
}

const closeDropdown = () => (show.value = false)

emit('hook', { setProps, openDropdown, closeDropdown })

defineExpose<WDropdown.Inst.WDropdownInst>({
  setProps,
  openDropdown,
  closeDropdown,
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'WDropdown',

  inheritAttrs: false,
})
</script>

<template>
  <n-dropdown
    v-bind="getProps.dropdownProps"
    trigger="manual"
    placement="bottom-start"
    :show="show"
    :x="x"
    :y="y"
    @clickoutside="show = false"
  />
</template>
