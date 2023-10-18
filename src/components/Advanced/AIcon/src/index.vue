<script lang="ts" setup>
import type { PopoverPlacement } from 'naive-ui'

// TODO 888
interface InternalProps {
  type?: NaiveCompType
  disabled?: boolean
  text?: boolean
  helpMessage?: string | (() => string)
  placement?: PopoverPlacement
}

const props = withDefaults(defineProps<InternalProps>(), { text: true })
</script>

<script lang="ts">
export default defineComponent({
  name: 'WAIcon',
})
</script>

<template>
  <template v-if="helpMessage">
    <n-tooltip trigger="hover" :placement="placement">
      <template #default>
        <span class="whitespace-nowrap" @click.stop>
          {{ typeof helpMessage === 'string' ? helpMessage : helpMessage() }}
        </span>
      </template>

      <template #trigger>
        <n-button
          :text="text"
          :type="type"
          :disabled="disabled"
          v-bind="$attrs"
        >
          <w-icon
            :icon="$attrs.icon"
            :height="$attrs.height"
            :width="$attrs.width"
            :disabled="disabled"
          />
        </n-button>
      </template>
    </n-tooltip>
  </template>

  <template v-else>
    <n-button :text="text" :type="type" :disabled="disabled">
      <w-icon
        :icon="$attrs.icon"
        :height="$attrs.height"
        :width="$attrs.width"
        :disabled="disabled"
      />
    </n-button>
  </template>
</template>
