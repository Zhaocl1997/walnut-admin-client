<script lang="ts" setup>
defineOptions({
  name: 'DropdownDemo',
  defaultView: false,
})

const state = reactive({
  dropdown1: '',
  dropdown2: '',
  dropdown3: '',
  dropdown4: '',

  disabled: false,
  divided: false,
  icon: false,
})

const options = computed(() => {
  return [
    {
      value: '1',
      label: 'New York City',
      disabled: state.disabled,
    },
    {
      value: '2',
      label: 'Pairs',
    },
    {
      value: '3',
      label: 'London',
      icon: state.icon ? 'el-icon-question' : '',
    },
    {
      value: '4',
      label: 'Tokyo',
    },
    {
      value: '5',
      label: 'Beijing',
      divided: state.divided,
    },
    {
      value: '6',
      label: 'Shanghai',
    },
  ]
})
</script>

<template>
  <WDemoCard title="Dropdown">
    <!--
    <WTitle show-left>Base usage 【{{ dropdown1 }}】</WTitle>
    <el-form inline>
      <el-space>
        <el-form-item label="Disabled">
          <el-switch v-model="disabled" />
        </el-form-item>

        <el-form-item label="Divider">
          <el-switch v-model="divided" />
        </el-form-item>

        <el-form-item label="Icon">
          <el-switch v-model="icon" />
        </el-form-item>
      </el-space>
    </el-form>

    <br />

    <w-dropdown v-model="dropdown1" :options="options" trigger="click">
      <template #default>
        <div>
          <WIcon
            icon="ant-design:info-circle-outlined"
            class="cursor-pointer"
            width="24"
          ></WIcon>
        </div>
      </template>
    </w-dropdown> -->
  </WDemoCard>
</template>
