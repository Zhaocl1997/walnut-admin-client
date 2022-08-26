<template>
  <n-form-item>
    <n-space :wrap="false" size="small">
      <n-button
        size="small"
        type="primary"
        @click="onQuery"
        :disabled="formProps.disabled"
        :loading="formProps.disabled"
      >
        <template #>{{ t('app.button.search') }}</template>
        <template #icon>
          <w-icon icon="ant-design:search-outlined"></w-icon>
        </template>
      </n-button>

      <n-button
        size="small"
        type="info"
        @click="onFormReset"
        :disabled="formProps.disabled"
      >
        <template #>{{ t('app.button.reset') }}</template>
        <template #icon>
          <w-icon icon="carbon:reset"></w-icon>
        </template>
      </n-button>

      <n-button
        v-if="foldable"
        size="small"
        type="default"
        icon-placement="right"
        @click="onToggle"
        :disabled="formProps.disabled"
      >
        <template #>{{ getText }}</template>
        <template #icon>
          <w-arrow :active="!active" class="mt-0.5"></w-arrow>
        </template>
      </n-button>
    </n-space>
  </n-form-item>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WFormItemExtendQuery',
  })
</script>

<script lang="ts" setup>
  import { useFormContext } from '../../hooks/useFormContext'

  // TODO 888
  interface InternalProps {
    countToFold?: number
    foldable?: boolean
    defaultFold?: boolean
  }

  const props = defineProps<InternalProps>()

  const { t } = useAppI18n()

  const active = ref(props.defaultFold)

  const getText = computed(() =>
    active.value ? t('app.button.expand') : t('app.button.collapse')
  )

  const { formEvent, formSchemas, setProps, formProps } = useFormContext()

  const done = () => {
    setProps({ disabled: false })
  }

  const onFormReset = () => {
    setProps({ disabled: true })
    formEvent({
      name: 'reset',
      params: {
        done,
      },
    })
  }

  const onQuery = () => {
    setProps({ disabled: true })
    formEvent({
      name: 'query',
      params: {
        done,
      },
    })
  }

  const onToggle = () => {
    active.value = !active.value

    for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
      formSchemas.value[i]._internalShow = !formSchemas.value[i]._internalShow
    }
  }

  onMounted(() => {
    if (props.defaultFold) {
      for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
        formSchemas.value[i]._internalShow = false
      }
    }
  })
</script>
