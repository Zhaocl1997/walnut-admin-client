<template>
  <el-card>
    <template #header>
      <span>SelectTree：</span>
    </template>

    <w-title show-left>Single 【{{ selectTree1 }}】 </w-title>
    <w-select-tree v-model="selectTree1" :data="data" :props="props" />

    <br />
    <br />

    <w-title show-left>Multiple 【{{ selectTree2 }}】 </w-title>
    <w-select-tree
      v-model="selectTree2"
      multiple
      :data="data"
      :props="props"
      accordion
    />

    <br />
    <br />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'SelectTreeDemo',

    components: {},

    setup() {
      const state = reactive({
        selectTree1: 15,
        selectTree2: [4, 9, 10, 17],

        data: [
          {
            _id: 1,
            label: '一级 1',
            children: [
              {
                _id: 4,
                label: '二级 1-1',
                children: [
                  {
                    _id: 9,
                    label: '三级 1-1-1',
                  },
                  {
                    _id: 10,
                    label: '三级 1-1-2',
                  },
                ],
              },
              {
                _id: 11,
                label: '二级 1-2',
                children: [
                  {
                    _id: 12,
                    label: '三级 1-2-1',
                  },
                  {
                    _id: 13,
                    label: '三级 1-2-2',
                    _disabled: true,
                  },
                ],
              },
            ],
          },
          {
            _id: 2,
            label: '一级 2',
            children: [
              {
                _id: 5,
                label: '二级 2-1',
                children: [
                  {
                    _id: 14,
                    label: '三级 2-1-1',
                  },
                  {
                    _id: 15,
                    label: '三级 2-1-2',
                  },
                ],
              },
              {
                _id: 6,
                label: '二级 2-2',
                children: [
                  {
                    _id: 16,
                    label: '三级 2-2-1',
                    _disabled: true,
                  },
                  {
                    _id: 17,
                    label: '三级 2-2-2',
                  },
                ],
              },
            ],
          },
          {
            _id: 3,
            label: '一级 3',
            children: [
              {
                _id: 7,
                label: '二级 3-1',
                disabled: true,
              },
              {
                _id: 8,
                label: '二级 3-2',
              },
            ],
          },
        ],

        props: {
          id: '_id',
          disabled: '_disabled',
        },
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
