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

      <n-list-item>
        <w-title prefix="bar">Button with basic auth </w-title>

        <w-button auth="system:user:list" @click="onClick"
          >Auth Button</w-button
        >

        <w-button auth="auth:donot:exist" @click="onClick"
          >Auth Button</w-button
        >
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Confirm Button </w-title>

        <w-button confirm @click="onClick">Confirm Button</w-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar"
          >Icon Button (need to provide `icon` and `text-prop`` props)
        </w-title>

        <w-button
          @click="onClick"
          icon="ant-design:plus-outlined"
          text-prop="Edit"
          icon-button
        ></w-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Icon Button also confirm </w-title>

        <w-button
          @click="onClick"
          icon="ant-design:plus-outlined"
          text-prop="Edit"
          icon-button
          confirm
        ></w-button>
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
