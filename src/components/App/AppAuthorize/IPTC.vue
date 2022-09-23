<template>
  <w-transition appear name="fade-down">
    <div
      v-if="!state"
      class="relative flex justify-center items-center"
      :style="{ height: presetHeight, width: presetWidth }"
    >
      <div
        class="h-full w-full bg-gray-500/50 blur-sm brightness-80 contrast-50"
      ></div>

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
        ></n-input>
      </n-form-item>
    </div>

    <slot v-else></slot>
  </w-transition>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    permission: string
    presetWidth: string
    presetHeight: string
  }>()

  const inputValue = ref<string>()
  const state = ref(false)

  const { t } = useAppI18n()

  const rule = {
    trigger: ['blur'],

    validator() {
      if (!inputValue.value) return true

      if (inputValue.value !== props.permission) {
        return new Error(t('app.authorize.iptc.error'))
      }

      state.value = true
      return true
    },
  }

  const onKeyup = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (inputValue.value !== props.permission) {
        useAppMsgError(t('app.authorize.iptc.error'))
        return
      }

      state.value = true
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppAuthorize',
  })
</script>
