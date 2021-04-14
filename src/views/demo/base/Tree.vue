<template>
  <el-card>
    <template #header>
      <span>Tree：</span>
    </template>

    <w-title show-left>Single 【{{ tree1 }}】 </w-title>
    <WTree v-model="tree1" :data="data" :props="props" />

    <br />
    <br />

    <el-button @click="onToggleExpandAll">Expand all</el-button>
    <el-button @click="onToggleCheckAll">Check all</el-button>
    <el-button @click="onClear">Clear</el-button>

    <w-title show-left>Multiple 【{{ tree2 }}】 </w-title>
    <WTree ref="wTree2" v-model="tree2" multiple :data="data" :props="props" />

    <br />
    <br />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'TreeDemo',

    setup() {
      const state = reactive({
        tree1: 15,
        tree2: [4, 9, 10, 17],

        wTree2: null,
        expand: false,
        check: false,

        data: [
          {
            _id: 1,
            label: 'Level 1',
            children: [
              {
                _id: 4,
                label: 'Level 1-1',
                children: [
                  {
                    _id: 9,
                    label: 'Level 1-1-1',
                  },
                  {
                    _id: 10,
                    label: 'Level 1-1-2',
                  },
                ],
              },
              {
                _id: 11,
                label: 'Level 1-2',
                children: [
                  {
                    _id: 12,
                    label: 'Level 1-2-1',
                  },
                  {
                    _id: 13,
                    label: 'Level 1-2-2',
                    _disabled: true,
                  },
                ],
              },
            ],
          },
          {
            _id: 2,
            label: 'Level 2',
            children: [
              {
                _id: 5,
                label: 'Level 2-1',
                children: [
                  {
                    _id: 14,
                    label: 'Level 2-1-1',
                  },
                  {
                    _id: 15,
                    label: 'Level 2-1-2',
                  },
                ],
              },
              {
                _id: 6,
                label: 'Level 2-2',
                children: [
                  {
                    _id: 16,
                    label: 'Level 2-2-1',
                  },
                  {
                    _id: 17,
                    label: 'Level 2-2-2',
                  },
                ],
              },
            ],
          },
          {
            _id: 3,
            label: 'Level 3',
            children: [
              {
                _id: 7,
                label: 'Level 3-1',
              },
              {
                _id: 8,
                label: 'Level 3-2',
              },
            ],
          },
        ],

        props: {
          id: '_id',
          disabled: (data, node) => {
            // disabled level 2
            return node.level === 2
          },
        },
      })

      const onToggleExpandAll = () => {
        state.wTree2.expandAll(state.expand)
        state.expand = !state.expand
      }

      const onToggleCheckAll = () => {
        state.wTree2.checkAll(state.check)
        state.check = !state.check
      }

      const onClear = () => {
        state.wTree2.setCheckedKeys([])
        state.tree2 = []
      }

      return {
        ...toRefs(state),
        onToggleExpandAll,
        onToggleCheckAll,
        onClear,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
