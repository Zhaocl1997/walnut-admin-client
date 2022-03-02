<template>
  <w-demo-card :title="`Button: ${value}`">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Text in slot/prop </w-title>

        <n-space>
          <w-button @click="onClick">Click(slot)</w-button>
          <w-button @click="onClick" text-prop="Click(prop)"></w-button>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Icon(prop) </w-title>

        <w-button
          @click="onClick"
          type="primary"
          icon="ant-design:home-outlined"
        >
          Icon through prop
        </w-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Retry Button </w-title>

        <w-button @click="onClick" type="success" :retry="10">
          Send email
        </w-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Debounece Button </w-title>

        <w-button @click="onClick" type="warning" :debounce="500">
          Debouned 500ms
        </w-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Button Groups </w-title>

        <w-button-group
          :groups="[
            { textProp: 'Button 1', onClick },
            { textProp: 'Button 2', onClick },
            { textProp: 'Button 3', onClick },
          ]"
        ></w-button-group>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts">
  export default {
    name: 'ButtonDemo',

    defaultView: false,
  }
</script>

<script setup lang="ts">
  const value = ref(0)

  const onClick = () => {
    value.value++
  }
</script>
