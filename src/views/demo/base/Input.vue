<template>
  <el-card>
    <template #header>
      <span>Input：</span>
    </template>

    <w-title show-left>Base 【{{ input1 }}】 </w-title>
    <w-input
      v-model="input1"
      clearable
      @clear="onClear"
      @change="onChange"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />

    <br />
    <br />

    <w-title show-left
      >Black List (Forbidden to input "^" and ">") 【{{ input2 }}】
    </w-title>
    <w-input v-model="input2" clearable :black-list="['^', '>']" />

    <br />
    <br />

    <w-title show-left>Password 【{{ input3 }}】 </w-title>
    <w-input v-model="input3" clearable show-password />

    <br />
    <br />

    <w-title show-left>Suffix/Prefix Icon(prop) 【{{ input4 }}】 </w-title>
    <w-input
      v-model="input4"
      clearable
      suffix-icon="el-icon-date"
      prefix-icon="el-icon-search"
    />

    <br />
    <br />

    <w-title show-left>Suffix/Prefix Icon(slot) 【{{ input5 }}】 </w-title>
    <w-input v-model="input5" clearable>
      <template #suffix>
        <i class="el-icon-date" />
      </template>

      <template #prefix>
        <i class="el-icon-search" />
      </template>
    </w-input>

    <br />
    <br />

    <w-title show-left>Prepend/Append Content(prop) 【{{ input6 }}】 </w-title>
    <w-input
      v-model="input6"
      prepend="Http://"
      append=".com"
      clearable
    ></w-input>

    <br />
    <br />

    <w-title show-left>Prepend/Append Content(slot) 【{{ input7 }}】 </w-title>
    <w-input v-model="input7" clearable>
      <template #prepend>Http://</template>
      <template #append>.com</template>
    </w-input>

    <br />
    <br />

    <w-title show-left>Textarea 【{{ input8 }}】 </w-title>
    <w-input
      v-model="input8"
      clearable
      type="textarea"
      maxlength="200"
      show-word-limit
      :autosize="{ minRows: 3, maxRows: 6 }"
      rows="5"
    />

    <br />
    <br />

    <w-title show-left
      >Custom ModelModifiers【{{ input9 }}】【{{ input12 }}】【{{ input13 }}】
    </w-title>

    <w-input
      v-model.capitalize="input9"
      clearable
      placeholder="Captialise the FIRST letter"
    />

    <br />
    <br />

    <w-input
      v-model.uppercase="input12"
      clearable
      placeholder="Captialise all letters"
    />

    <br />
    <br />

    <w-input v-model.camel="input13" clearable placeholder="Camelize input" />

    <br />
    <br />

    <w-title show-left
      >Help message (Support for prefix/suffix/prepend/append) 【{{ input10 }}】
    </w-title>
    <w-input v-model="input10" clearable help-message="Some help message" />

    <br />
    <br />

    <w-title show-left>Debounce search input 【{{ input11 }}】 </w-title>
    <w-input v-model="input11" clearable :debounce="500" @search="onInput" />
  </el-card>
</template>

<script lang="ts">
  import { toRefs, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'InputDemo',

    setup() {
      const state = reactive({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: '',
        input12: '',
        input13: '',
      })

      const onChange = (value: any) => {
        console.log('[w-input change]', value)
      }

      const onInput = (value: any) => {
        console.log('[w-input input]', value)
      }

      const onBlur = () => {
        console.log('[w-input blur]')
      }

      const onFocus = () => {
        console.log('[w-input focus]')
      }

      const onClear = () => {
        console.log('[w-input clear]')
      }

      return {
        ...toRefs(state),

        onChange,
        onInput,
        onBlur,
        onFocus,
        onClear,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
