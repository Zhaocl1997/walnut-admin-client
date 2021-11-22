<template>
  <div>
    <w-demo-card title="Message">
      <n-space size="small">
        <w-message msg="This is a help message."></w-message>

        <w-message
          :msg="'This is a help message. \\n Wrap by string.'"
        ></w-message>

        <w-message
          :msg="['This is a help message.', 'Wrap by array.']"
        ></w-message>

        <w-message
          msg="Change Icon"
          icon="ant-design:home-outlined"
        ></w-message>

        <w-message
          msg="All n-tooltip props will work."
          placement="bottom"
          :show-arrow="false"
          :delay="1000"
        ></w-message>
      </n-space>
    </w-demo-card>

    <br />

    <w-demo-card title="Title">
      <n-space size="small" vertical>
        <w-title>This is a normal title.</w-title>
        <w-title help-message="This is a help message."
          >This is a title with a help message.</w-title
        >
        <w-title prefix="bar" type="error">This is a title with state.</w-title>
      </n-space>
    </w-demo-card>

    <br />

    <w-demo-card title="Arrow">
      <n-space size="small" vertical>
        <n-form :model="arrow" inline label-placement="left" :label-width="60">
          <n-form-item label="Active" path="active">
            <n-switch v-model:value="arrow.active" />
          </n-form-item>

          <n-form-item label="Left" path="left">
            <n-switch v-model:value="arrow.left" />
          </n-form-item>

          <n-form-item label="Right" path="right">
            <n-switch v-model:value="arrow.right" />
          </n-form-item>
        </n-form>

        <w-arrow
          :active="arrow.active"
          :left="arrow.left"
          :right="arrow.right"
          @click="arrow.active = !arrow.active"
        ></w-arrow>
      </n-space>
    </w-demo-card>

    <br />

    <w-demo-card title="Flipper">
      <n-space size="small">
        <w-flipper trigger="hover" width="270px" height="300px">
          <template #front>
            <div class="abs-center">this is front</div>
          </template>

          <template #back>
            <div class="abs-center">this is back</div>
          </template>
        </w-flipper>

        <w-flipper trigger="click" width="270px" height="300px">
          <template #front>
            <div class="abs-center">this is front</div>
          </template>

          <template #back>
            <div class="abs-center">this is back</div>
          </template>
        </w-flipper>
      </n-space>
    </w-demo-card>

    <br />

    <w-demo-card title="App Locale Picker">
      <w-app-locale-picker></w-app-locale-picker>
    </w-demo-card>

    <br />

    <w-demo-card title="App Dark Mode Picker">
      <w-app-dark-mode></w-app-dark-mode>
    </w-demo-card>

    <br />

    <w-demo-card title="Icon Picker">
      <w-title prefix="bar">【{{ icon }}】</w-title>

      <w-icon-picker v-model:value="icon"></w-icon-picker>
    </w-demo-card>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'ExtraDemo',

    setup() {
      const state = reactive({
        arrow: {
          active: false,
          left: false,
          right: false,
        },
        icon: '',
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
