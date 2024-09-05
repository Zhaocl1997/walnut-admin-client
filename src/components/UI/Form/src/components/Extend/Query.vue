<script lang="ts">
</script>

<script lang="ts" setup>
import { useFormContext } from '../../hooks/useFormContext'
import { toggleFormItemId } from '../../hooks/useFormItemId'

defineOptions({
  name: 'WFormItemExtendQuery',
})

const props = defineProps<InternalProps>()

// TODO 888
interface InternalProps {
  countToFold?: number
  foldable?: boolean
  defaultFold?: boolean
}

const { t } = useAppI18n()

const active = ref(false)

const getText = computed(() =>
  active.value ? t('app.button.expand') : t('app.button.collapse'),
)

const { formEvent, formSchemas, setProps, formProps } = useFormContext()

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

    toggleFormItemId(item, i)
  }
}

onMounted(() => {
  if (props.defaultFold)
    onToggle()
})
</script>

<template>
  <n-form-item>
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
          <w-icon icon="ant-design:search-outlined" />
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
          <w-icon icon="carbon:reset" />
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
          <w-arrow :active="!active" class="mt-0.5" />
        </template>
      </n-button>
    </n-space>
  </n-form-item>
</template>
