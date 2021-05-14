<template>
  <el-card>
    <template #header>
      <span>Tree：</span>
    </template>

    <w-title show-left>Base 【{{ tree1 }}】 </w-title>
    <w-form v-model="tree1Form" @hook="register1Form"></w-form>
    <w-tree v-model="tree1" @hook="register1" />

    <br />
    <br />

    <w-title show-left>Multiple 【{{ tree2 }}】 </w-title>
    <w-form v-model="tree2Form" @hook="register2Form"></w-form>
    <w-tree v-model="tree2" @hook="register2" />

    <br />
    <br />

    <w-title show-left>Lazy 【{{ tree3 }}】 </w-title>
    <w-tree v-model="tree3" @hook="register3" />
  </el-card>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'

  import { appInfo, appTable } from '/@/utils/log'
  import { useTree } from '/@/components/UI/Tree'
  import { useForm } from '/@/components/UI/Form'
  import { useMessage, useNotification } from '/@/hooks/component/useMessage'

  import { getTreeData } from '../data'

  export default defineComponent({
    name: 'TreeDemo',

    setup() {
      const state = reactive({
        tree1: '7',
        tree2: [8, 14],
        tree3: '',
        tree1Form: {},
        tree2Form: {
          leafOnly: false,
          includeHalfChecked: false,
        },
        checked: false,
        expand: false,
        checkAll: false,
      })

      const [
        register1,
        {
          filter,
          updateKeyChildren,
          // getCheckedNodes,
          // setCheckedNodes,
          // getCheckedKeys,
          // setCheckedKeys,
          // setChecked,
          // getHalfCheckedNodes,
          // getHalfCheckedKeys,
          getCurrentKey,
          getCurrentNode,
          setCurrentKey,
          setCurrentNode,
          getNode,
          remove,
          append,
          insertBefore,
          insertAfter,
          expandAll,
          // checkAll
        },
      ] = useTree<{
        _id: number
        _label: string
      }>({
        data: getTreeData(),
        filterNodeMethod: (value, data) => {
          if (!value) return true
          return data._label.indexOf(value) !== -1
        },
        props: {
          id: '_id',
          label: '_label',
        },
      })

      const [
        register2,
        {
          // updateKeyChildren,
          getCheckedNodes,
          setCheckedNodes,
          getCheckedKeys,
          setCheckedKeys,
          setChecked,
          getHalfCheckedNodes,
          getHalfCheckedKeys,
          // getCurrentKey,
          // getCurrentNode,
          // setCurrentKey,
          // setCurrentNode,
          // getNode,
          // remove,
          // append,
          // insertBefore,
          // insertAfter,
          // expandAll,
          checkAll,
        },
      ] = useTree<{
        _id: number
        _label: string
      }>({
        data: getTreeData(),
        multiple: true,
        leafOnly: computed(() => state.tree2Form.leafOnly),
        includeHalfChecked: computed(() => state.tree2Form.includeHalfChecked),
        props: {
          id: '_id',
          label: '_label',
        },
      })

      const [register3] = useTree<{ _id: number; _label: string }>({
        data: getTreeData(),
        props: {
          id: '_id',
          label: '_label',
        },
        lazy: true,
        load: (node, resolve) => {
          if (node.level === 0) {
            return resolve([{ _id: 1, _label: 'Level 1' }])
          }

          setTimeout(() => {
            resolve([
              {
                _id: Math.ceil(Math.random() * 1000),
                _label: 'Lazy node',
              },
            ])
          }, 500)
        },
      })

      const [register1Form] = useForm({
        schemas: [
          {
            type: 'Input',
            componentProp: {
              placeholder: 'Input to filter the tree',
              onInput: (val) => {
                filter(val)
              },
            },
          },
          {
            type: 'ButtonGroup',
            componentProp: {
              groups: [
                {
                  text: 'UpdateKeyChildren',
                  helpMessage: 'Watch Level 3-2',
                  onClick: () => {
                    updateKeyChildren(8, [
                      {
                        _id: 99,
                        _label: 'Label 3-2-1',
                        children: [
                          {
                            _id: 100,
                            _label: 'Label 3-2-1-1',
                            children: [
                              {
                                _id: 101,
                                _label: 'Label 3-2-1-1-1',
                              },
                            ],
                          },
                        ],
                      },
                    ])
                  },
                },

                {
                  text: 'GetCurrentKey',
                  onClick: () => {
                    if (!state.tree1) {
                      useMessage({
                        type: 'info',
                        message: 'Please select one tree node!',
                      })
                      return
                    }
                    const key = getCurrentKey()
                    useNotification({
                      type: 'success',
                      title: 'Tree Key',
                      message: key as string,
                    })
                  },
                },

                {
                  text: 'GetCurrentNode',
                  onClick: () => {
                    if (!state.tree1) {
                      useMessage({
                        type: 'info',
                        message: 'Please select one tree node!',
                      })
                      return
                    }

                    const node = getCurrentNode()

                    useNotification({
                      type: 'success',
                      title: 'Tree Node',
                      message: JSON.stringify(node),
                    })
                  },
                },

                {
                  text: 'SetCurrentKey',
                  helpMessage:
                    'This is the same method inside w-tree to feedback the modelValue. And this will not trigger modelValue change.',
                  onClick: () => {
                    setCurrentKey(7)
                  },
                },

                {
                  text: 'SetCurrentNode',
                  onClick: () => {
                    setCurrentNode({
                      _id: 3,
                    })
                  },
                },

                {
                  text: 'GetNode(key)',
                  onClick: () => {
                    if (!state.tree1) {
                      useMessage({
                        type: 'info',
                        message: 'Please select one tree node!',
                      })
                      return
                    }

                    const node = getNode(3)
                    appInfo(node)
                  },
                },

                {
                  text: 'GetNode(node)',
                  onClick: () => {
                    if (!state.tree1) {
                      useMessage({
                        type: 'info',
                        message: 'Please select one tree node!',
                      })
                      return
                    }

                    const node = getNode({
                      _id: 3,
                    })
                    appInfo(node)
                  },
                },

                {
                  text: 'Remove',
                  helpMessage: 'Watch Level 3-1',
                  onClick: () => {
                    remove(7)
                  },
                },

                {
                  text: 'Append',
                  helpMessage: 'Watch Level 3-2',
                  onClick: () => {
                    append({ _id: 999, _label: 'Level Append' }, 8)
                  },
                },

                {
                  text: 'InsertBefore',
                  helpMessage: 'Watch Level 3-2',
                  onClick: () => {
                    insertBefore({ _id: 888, _label: 'Level InsertBefore' }, 8)
                  },
                },

                {
                  text: 'InsertAfter',
                  helpMessage: 'Watch Level 3-2',
                  onClick: () => {
                    insertAfter({ _id: 777, _label: 'Level InsertAfter' }, 8)
                  },
                },

                {
                  text: 'Expand All',
                  onClick: () => {
                    state.expand = !state.expand
                    expandAll(state.expand)
                  },
                },
              ],
            },
          },
        ],
      })

      const [register2Form] = useForm({
        labelWidth: '',
        schemas: [
          {
            type: 'Switch',
            formProp: {
              label: 'Leaf Only',
              prop: 'leafOnly',
            },
            colProp: {
              span: 8,
            },
          },

          {
            type: 'Switch',
            formProp: {
              label: 'Include Half Checked Nodes',
              prop: 'includeHalfChecked',
            },
            colProp: {
              span: 8,
            },
          },

          {
            type: 'ButtonGroup',
            componentProp: {
              groups: [
                {
                  text: 'GetCheckedNodes',
                  onClick: () => {
                    if (state.tree2.length === 0) {
                      useMessage({
                        type: 'info',
                        message: 'Please select nodes!',
                      })
                      return
                    }

                    const nodes = getCheckedNodes(
                      state.tree2Form.leafOnly,
                      state.tree2Form.includeHalfChecked
                    )

                    appTable(nodes)
                  },
                },

                {
                  text: 'SetCheckedNodes',
                  helpMessage: 'Watch Level 3 children',
                  onClick: () => {
                    setCheckedNodes([{ _id: 7 }, { _id: 8 }])
                  },
                },

                {
                  text: 'GetCheckedKeys',
                  onClick: () => {
                    if (state.tree2.length === 0) {
                      useMessage({
                        type: 'info',
                        message: 'Please select nodes!',
                      })
                      return
                    }

                    // TODO leafOnly not working
                    const keys = getCheckedKeys(state.tree2Form.leafOnly)

                    appTable(keys)
                  },
                },

                {
                  text: 'SetCheckedKeys',
                  onClick: () => {
                    setCheckedKeys([7])
                  },
                },

                {
                  text: 'SetChecked',
                  onClick: () => {
                    state.checked = !state.checked
                    setChecked(3, state.checked)
                  },
                },

                {
                  text: 'SetChecked(deep)',
                  onClick: () => {
                    state.checked = !state.checked
                    setChecked(3, state.checked, true)
                  },
                },

                {
                  text: 'GetHalfCheckedNodes',
                  onClick: () => {
                    if (state.tree2.length === 0) {
                      useMessage({
                        type: 'info',
                        message: 'Please select nodes!',
                      })
                      return
                    }

                    const nodes = getHalfCheckedNodes()

                    appTable(nodes)
                  },
                },

                {
                  text: 'GetHalfCheckedKeys',
                  onClick: () => {
                    if (state.tree2.length === 0) {
                      useMessage({
                        type: 'info',
                        message: 'Please select nodes!',
                      })
                      return
                    }

                    const keys = getHalfCheckedKeys()

                    appTable(keys)
                  },
                },

                {
                  text: 'Check All',
                  onClick: () => {
                    state.checkAll = !state.checkAll
                    checkAll(state.checkAll)
                  },
                },
              ],
            },
          },
        ],
      })

      return {
        ...toRefs(state),
        register1Form,
        register1,
        register2Form,
        register2,
        register3,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
