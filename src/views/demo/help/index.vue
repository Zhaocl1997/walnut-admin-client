<template>
  <el-card>
    <template #header>
      <span>Help Components</span>
    </template>

    <w-title show-left>Tooltip help message</w-title>
    <el-space>
      <WMessage
        content="Tooltip Help Message1"
        placement="top"
        effect="dark"
      ></WMessage>

      <WMessage
        content="Tooltip Help Message2"
        placement="bottom"
        effect="light"
      ></WMessage>

      <WMessage
        content="Tooltip Help Message3"
        placement="top"
        effect="dark"
        icon="el-icon-warning-outline"
      ></WMessage>
    </el-space>

    <br />
    <br />

    <w-title show-left>Title</w-title>
    <w-title content="Help message 1" placement="top" effect="dark"
      >Title 1</w-title
    >
    <w-title content="Help message 2" placement="bottom" effect="light"
      >Title 2</w-title
    >
    <w-title
      content="Help message 3"
      placement="top"
      effect="dark"
      icon="el-icon-warning-outline"
      >Title 3</w-title
    >

    <br />

    <w-title show-left>Arrow</w-title>
    <el-form inline>
      <el-form-item label="Active">
        <el-switch v-model="arrow.active"></el-switch>
      </el-form-item>

      <el-form-item label="Turn to left">
        <el-switch v-model="arrow.left" :disabled="arrow.right"></el-switch>
      </el-form-item>

      <el-form-item label="Turn to right">
        <el-switch v-model="arrow.right" :disabled="arrow.left"></el-switch>
      </el-form-item>
    </el-form>

    <WArrow
      :active="arrow.active"
      :left="arrow.left"
      :right="arrow.right"
    ></WArrow>

    <br />
    <br />

    <w-title show-left>Flipper</w-title>
    <br />

    <el-space size="medium">
      <WFlipper trigger="click" class="Card" width="270px" height="300px">
        <template #front>
          <div class="Card__face">
            <span class="Card__value Card__value--top">10</span>
            <span class="Card__center">♣</span>
            <span class="Card__value Card__value--bottom">10</span>
          </div>
        </template>

        <template #back>
          <figure class="Card__pattern"></figure>
        </template>
      </WFlipper>

      <WFlipper trigger="hover" class="Card" width="270px" height="300px">
        <template #front>
          <div class="Card__face">
            <span class="Card__value Card__value--top">10</span>
            <span class="Card__center">♣</span>
            <span class="Card__value Card__value--bottom">10</span>
          </div>
        </template>

        <template #back>
          <figure class="Card__pattern"></figure>
        </template>
      </WFlipper>
    </el-space>

    <br />
    <br />

    <w-title show-left>Locale Picker</w-title>

    <WAppLocalePicker></WAppLocalePicker>
    <WAppLocalePicker show-text></WAppLocalePicker>

    <br />
    <br />

    <w-title show-left>Icon Picker 【{{ icon }}】</w-title>

    <WIconPicker v-model="icon"></WIconPicker>

    <br />
    <br />

    <w-title show-left>Screen full</w-title>

    <WAppFullScreen></WAppFullScreen>
  </el-card>
</template>

<script lang="ts">
  import { genString } from 'easy-fns-ts'
  import { reactive, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'HelpDemo',

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

<style lang="scss" scoped>
  .Card {
    display: inline-block;

    &__face,
    &__pattern {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: 0 3px 15px rgba(#000, 0.45);
      cursor: pointer;
    }

    &__pattern {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAiPgo8ZGVmcz4KPHJlY3QgaWQ9InIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2JiMDg1ZiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZT0iIzdhMDU0ZCI+PC9yZWN0Pgo8ZyBpZD0icCI+Cjx1c2UgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8dXNlIHk9IjE1IiB4bGluazpocmVmPSIjciI+PC91c2U+Cjx1c2UgeT0iMzAiIHhsaW5rOmhyZWY9IiNyIj48L3VzZT4KPHVzZSB5PSI0NSIgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8L2c+CjwvZGVmcz4KPHVzZSB4bGluazpocmVmPSIjcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjUpIHNrZXdZKDQwKSI+PC91c2U+Cjx1c2UgeGxpbms6aHJlZj0iI3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwIDApIHNrZXdZKC00MCkiPjwvdXNlPgo8L3N2Zz4=');
    }

    &__face {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 15px;
    }

    &__value {
      display: block;
      font-size: 18pt;

      &--top {
        align-self: flex-start;
      }

      &--bottom {
        align-self: flex-end;
      }
    }

    &__center {
      display: block;
      align-self: center;
      font-size: 32pt;
    }
  }
</style>
