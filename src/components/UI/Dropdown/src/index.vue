<script lang="ts" setup>
import type { WDropdown } from './types'

defineOptions({
  name: 'WDropdown',
  inheritAttrs: false,
})

const props = defineProps<WDropdownProps>()
const emit = defineEmits<WDropdownEmits>()
// avoid error
interface WDropdownProps extends /* @vue-ignore */ WDropdown.Props {}
interface WDropdownEmits extends /* @vue-ignore */ WDropdown.Emit.Entry {}

const { setProps, getProps } = useProps<WDropdown.Props>(props)

const show = ref(false)
const x = ref(0)
const y = ref(0)

function openDropdown(e: MouseEvent) {
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
