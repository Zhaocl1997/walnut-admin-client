<script lang="ts" setup>
import type { WFormItemDividerProps } from './types'
import { isUndefined } from 'easy-fns-ts'
import { useFormContext } from '../../hooks/useFormContext'

defineOptions({
  name: 'WFormItemExtendDivider',
})

const props = withDefaults(defineProps<WFormItemDividerProps>(), {
  startIndex: 0,
})

const active = ref(false)

const { formSchemas } = useFormContext()

const { t } = useAppI18n()

function onToggle() {
  active.value = !active.value

  for (
    let i = props.index! + props.startIndex! + 1;
    i <= props.index! + (props.endIndex! ?? formSchemas.value.length);
    i++
  ) {
    if (!isUndefined(formSchemas.value[i]?._internalShow)) {
      formSchemas.value[i]!._internalShow
          = !formSchemas.value[i]?._internalShow
    }
  }
}

const getHelpMsg = computed(() => {
  if (props.helpMessage === true)
    return t(`${props.title}.helpMsg`)

  return props.helpMessage === false ? '' : props.helpMessage
})
</script>

<template>
  <n-divider
    v-if="title"
    class="my-1"
    :title-placement="titlePlacement"
    :dashed="dashed"
  >
    <WTitle
      :class="titleClass"
      :help-message="getHelpMsg"
      :prefix="prefix"
      :type="type"
    >
      {{ t(title!) }}
    </WTitle>

    <w-arrow
      v-if="foldable"
      :active="!active"
      class="mb-1 ml-1"
      @click="onToggle"
    />
  </n-divider>

  <n-divider v-else />
</template>

<style scoped>
  .w-divider {
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}
</style>
