<script lang="ts" setup>
import type { ICompUIFormItemExtendQueryProps } from '.'
import { useFormContext } from '../../../hooks/useFormContext'

defineOptions({
  name: 'WFormItemExtendQuery',
})

const props = defineProps<ICompUIFormItemExtendQueryProps>()

const { t } = useAppI18n()

const active = ref(false)

const getText = computed(() =>
  active.value ? t('app.button.expand') : t('app.button.collapse'),
)

const { formEvent, formSchemas, setProps, formProps, formItemIdCtx } = useFormContext()

function done() {
  setProps({ disabled: false })
}

function onFormReset() {
  setProps({ disabled: true })
  formEvent({
    name: 'reset',
    params: {
      done,
    },
  })
}

function onQuery() {
  setProps({ disabled: true })
  formEvent({
    name: 'query',
    params: {
      done,
    },
  })
}

function onToggle() {
  active.value = !active.value

  for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
    const item = formSchemas.value[i]

    formItemIdCtx.toggleFormItemId(item, i)
  }
}

onMounted(() => {
  if (props.defaultFold)
    onToggle()
})
</script>

<template>
  <n-space :wrap="false" size="small">
    <n-button
      size="small"
      type="primary"
      :disabled="formProps.disabled"
      :loading="formProps.disabled"
      @click="onQuery"
    >
      <template #default>
        {{ t('app.button.search') }}
      </template>
      <template #icon>
        <WIcon icon="ant-design:search-outlined" />
      </template>
    </n-button>

    <n-button
      size="small"
      type="info"
      :disabled="formProps.disabled"
      @click="onFormReset"
    >
      <template #default>
        {{ t('app.button.reset') }}
      </template>
      <template #icon>
        <WIcon icon="carbon:reset" />
      </template>
    </n-button>

    <n-button
      v-if="foldable"
      size="small"
      type="default"
      icon-placement="right"
      :disabled="formProps.disabled"
      @click="onToggle"
    >
      <template #default>
        {{ getText }}
      </template>
      <template #icon>
        <WArrow :active="!active" class="mt-0.5" />
      </template>
    </n-button>
  </n-space>
</template>
