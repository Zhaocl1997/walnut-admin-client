<script lang="ts" setup>
defineOptions({
  name: 'InputDemo',
  defaultView: false,
})

const state = reactive<Recordable>({
  input10: 'walnut-copiable-input',
})

function onChange(value: string) {
  console.log('[w-input change]', value)
}

function onInput(value: string) {
  console.log('[w-input input]', value)
}

function onBlur() {
  console.log('[w-input blur]')
}

function onFocus() {
  console.log('[w-input focus]')
}

function onClear() {
  console.log('[w-input clear]')
}
</script>

<template>
  <w-demo-card title="Input">
    <w-JSON :value="state" />

    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Black List
        </w-title>

        <w-input
          v-model:value="state.input1"
          :black-list="['<', '>']"
          placeholder="'<' and '>' are not allowed to input"
          clearable
          @change="onChange"
          @input="onInput"
          @blur="onBlur"
          @focus="onFocus"
          @clear="onClear"
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Password
        </w-title>

        <w-input
          v-model:value="state.input2"
          type="password"
          show-password-on="mousedown"
          placeholder="Password input"
          clearable
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Suffix(prop)
        </w-title>

        <w-input
          v-model:value="state.input3"
          suffix="123"
          prefix="312"
          placeholder="Suffix/prefix through prop"
          clearable
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Suffix Icon(prop)
        </w-title>

        <w-input
          v-model:value="state.input4"
          suffix-icon="ant-design:home-outlined"
          prefix-icon="ant-design:home-outlined"
          placeholder="Suffix/prefix icon through prop"
          clearable
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Help Message
        </w-title>

        <w-input
          v-model:value="state.input5"
          help-message="Some help message"
          placeholder="With help message"
          clearable
        />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Builtin Modifier
        </w-title>

        <n-space vertical>
          <w-input
            v-model:value.trim="state.input6"
            placeholder="Trim modifier"
            clearable
          />

          <w-input
            v-model:value.capitalize="state.input7"
            placeholder="Capitalize modifier"
            clearable
          />

          <w-input
            v-model:value.uppercase="state.input8"
            placeholder="Uppercase modifier"
            clearable
          />
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Copiable
        </w-title>

        <n-space vertical>
          <w-input
            v-model:value="state.input9"
            placeholder="Content inside can be copied"
            clearable
            copiable
          />

          <w-input
            v-model:value="state.input10"
            placeholder="Content inside can be copied"
            clearable
            copiable
          />
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
