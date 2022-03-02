<template>
  <w-demo-card title="Dropdown">
    <!-- 
    <w-title show-left>Base usage 【{{ dropdown1 }}】</w-title>
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
          <w-icon
            icon="ant-design:info-circle-outlined"
            class="cursor-pointer"
            width="24"
          ></w-icon>
        </div>
      </template>
    </w-dropdown> -->
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'DropdownDemo',

    defaultView: false,

    setup() {
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

      return {
        options,
        ...toRefs(state),
      }
    },
  })
</script>
