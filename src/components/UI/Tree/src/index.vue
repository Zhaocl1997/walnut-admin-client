<template>
  <n-tree v-bind="getProps.treeProps"></n-tree>
</template>

<script lang="tsx" setup>
  import type { WTree } from './types'

  import { useProps } from '/@/hooks/core/useProps'

  interface WTreeProps extends WTree.Props {}

  const props = defineProps<WTreeProps>()

  const emit = defineEmits<{
    (event: 'hook', params: WTree.Emit.Hook): void
  }>()

  const { setProps, getProps } = useProps<WTree.Props>(props)

  watchEffect(() => {
    console.log(getProps.value, 123)
  })

  emit('hook', { setProps })

  defineExpose<WTree.Inst.WTreeInst>({
    setProps,
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'WTree',

    inheritAttrs: false,
  })
</script>
