<template>
  <el-card>
    <template #header>
      <span>Tree：</span>
    </template>

    <w-title show-left>Single 【{{ tree1 }}】 </w-title>
    <w-form @hook="registerForm"></w-form>
    <w-tree v-model="tree1" @hook="register1" />

    <!-- <br />
    <br />

    <el-button @click="onToggleExpandAll">Expand all</el-button>
    <el-button @click="onToggleCheckAll">Check all</el-button>
    <el-button @click="onClear">Clear</el-button>

    <w-title show-left>Multiple 【{{ tree2 }}】 </w-title>
    <w-tree ref="wTree2" v-model="tree2" multiple :data="data" :props="props" />

    <br />
    <br /> -->
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { useTree } from '/@/components/UI/Tree'
  import { useForm } from '/@/components/UI/Form'
  import { TreeData } from '../data'

  export default defineComponent({
    name: 'TreeDemo',

    setup() {
      const state = reactive({
        tree1: '',
        tree2: [],
      })

      const [register1, { updateKeyChildren }] = useTree<{
        _id: number
        _label: string
      }>({
        data: TreeData,
        props: {
          id: '_id',
          label: '_label',
        },
      })

      const [registerForm] = useForm({
        schemas: [
          {
            type: 'ButtonGroup',
            componentProp: {
              groups: [
                {
                  text: 'UpdateKeyChildren',
                  onClick: () => {
                    updateKeyChildren(8, [
                      {
                        _id: 99,
                        _label: 'Label 3-2-1',
                        children: [
                          {
                            _id: 100,
                            _label: 'Label 3-2-1-1',
                          },
                        ],
                      },
                    ])
                  },
                },
              ],
            },
          },
        ],
      })

      return {
        ...toRefs(state),
        registerForm,
        register1,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
