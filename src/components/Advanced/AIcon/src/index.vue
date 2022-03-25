<template>
  <template v-if="helpMessage">
    <n-tooltip trigger="hover" :placement="placement">
      <template #>
        <span class="whitespace-nowrap">
          {{ typeof helpMessage === 'string' ? helpMessage : helpMessage() }}
        </span>
      </template>

      <template #trigger>
        <n-button text :type="type" :disabled="disabled">
          <w-icon v-bind="$attrs" @click.stop></w-icon>
        </n-button>
      </template>
    </n-tooltip>
  </template>

  <template v-else>
    <n-button text :type="type" :disabled="disabled">
      <w-icon v-bind="$attrs" @click.stop></w-icon>
    </n-button>
  </template>
</template>

<script lang="ts">
  import { props } from './props'

  export default defineComponent({
    name: 'WAIcon',

    props,

    setup(prop) {},
  })
</script>
