<template>
  <n-divider
    class="my-1"
    v-if="title"
    :title-placement="titlePlacement"
    :dashed="dashed"
  >
    <w-title :help-message="getHelpMsg" :prefix="prefix" :type="type">
      {{ t(title!) }}
    </w-title>

    <w-arrow
      v-if="foldable"
      :active="!active"
      class="mb-1 ml-1"
      @click="onToggle"
    ></w-arrow>
  </n-divider>

  <n-divider v-else></n-divider>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WFormItemExtendDivider',
  })
</script>

<script lang="ts" setup>
  import { isUndefined } from 'easy-fns-ts'
  import { useFormContext } from '../../hooks/useFormContext'

  // TODO 888
  interface InternalProps {
    titlePlacement?: 'left' | 'right' | 'center'
    dashed?: boolean
    prefix?: 'bar' | undefined
    type?: NaiveCompType
    title?: string
    helpMessage?: string | boolean
    foldable?: boolean
    startIndex?: number
    endIndex?: number
    index?: number
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    startIndex: 0,
  })

  const active = ref(false)

  const { formSchemas } = useFormContext()

  const { t } = useAppI18n()

  const onToggle = () => {
    active.value = !active.value

    for (
      let i = props.index! + props.startIndex! + 1;
      i <= props.index! + (props.endIndex! ?? formSchemas.value.length);
      i++
    ) {
      if (!isUndefined(formSchemas.value[i]?._internalShow)) {
        formSchemas.value[i]!._internalShow =
          !formSchemas.value[i]?._internalShow
      }
    }
  }

  const getHelpMsg = computed(() => {
    if (props.helpMessage === true) {
      return t(`${props.title}:helpMsg`)
    }
    return props.helpMessage === false ? '' : props.helpMessage
  })
</script>

<style scoped>
  .w-divider {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
</style>
