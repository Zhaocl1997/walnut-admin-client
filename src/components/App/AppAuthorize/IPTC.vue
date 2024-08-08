<script lang="ts" setup>
defineOptions({
  name: 'AppAuthorize',
})

const props = defineProps<{
  permission: string
  presetWidth: string
  presetHeight: string
}>()

const emits = defineEmits(['success'])

const inputValue = ref<string>()
const state = ref(false)

const { t } = useAppI18n()
const userPermission = useAppStoreUserPermission()

function onSuccess() {
  emits('success')
  state.value = true
}

watch(
  () => props.permission,
  (v) => {
    if (userPermission.hasPermission(v))
      onSuccess()
  },
  {
    immediate: true,
  },
)

const rule = {
  trigger: ['blur'],

  validator() {
    if (!inputValue.value)
      return true

    if (inputValue.value !== props.permission)
      return new Error(t('app.authorize.iptc.error'))

    onSuccess()
    return true
  },
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if (inputValue.value !== props.permission) {
      useAppMsgError(t('app.authorize.iptc.error'))
      return
    }

    onSuccess()
  }
}
</script>

<template>
  <w-transition appear name="fade-down">
    <div
      v-if="!state"
      class="relative flex items-center justify-center"
      :style="{ height: presetHeight, width: presetWidth }"
    >
      <div
        class="h-full w-full bg-gray-500/50 blur-sm brightness-80 contrast-50"
      />

      <n-form-item
        class="abs-center"
        style="width: 80%"
        :label="t('app.authorize.iptc.label')"
        :rule="rule"
      >
        <n-input
          v-model:value="inputValue"
          clearable
          @keyup="onKeyup"
        />
      </n-form-item>
    </div>

    <slot v-else />
  </w-transition>
</template>
