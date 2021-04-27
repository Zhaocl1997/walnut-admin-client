<template>
  <div>
    <w-table @hook="registerTable">
      <template #show="{ row }">
        <el-tag size="mini" type="success" v-if="row.show">Display</el-tag>
        <el-tag size="mini" type="danger" v-else>Hidden</el-tag>
      </template>

      <template #status="{ row }">
        <el-tag size="mini" type="success" v-if="row.status">Enable</el-tag>
        <el-tag size="mini" type="danger" v-else>Disabled</el-tag>
      </template>

      <template #icon="{ row }">
        <w-icon :icon="row.icon" width="24" class="mt-1"></w-icon>
      </template>

      <template #type="{ row }">
        <el-tag size="mini" v-if="row.type === 'catalog'" type="info"
          >Catalog</el-tag
        >
        <el-tag size="mini" v-if="row.type === 'menu'">Menu</el-tag>
        <el-tag size="mini" v-if="row.type === 'element'" type="success"
          >Element</el-tag
        >
      </template>

      <template #action="{ row }">
        <el-button size="small" type="text" @click="onCreate(row._id)"
          >Create</el-button
        >
        <el-button size="small" type="text" @click="onUpdate(row._id)"
          >Edit</el-button
        >
        <el-popconfirm
          title="Do you insist to do so?"
          icon="el-icon-info"
          icon-color="red"
          @confirm="onDelete(row._id)"
        >
          <template #reference>
            <el-button size="small" type="text">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </w-table>

    <w-dialog
      @hook="registerDialog"
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
    >
      <w-form v-model="menuFormData" @hook="registerForm">
        <template #icon>
          <WIconPicker v-model="menuFormData.icon" />
        </template>
      </w-form>
    </w-dialog>
  </div>
</template>

<script lang="ts">
  import type { Menu } from '/@/router/types'
  import type { TreeNode } from 'easy-fns-ts'

  import { defineComponent, onMounted, ref, nextTick, computed } from 'vue'
  import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
  import { ElMessage } from 'element-plus'

  import { menuAPI } from '/@/api/system/menu'

  import { useTable } from '/@/components/UI/Table'
  import { useDialog } from '/@/components/UI/Dialog'
  import { useForm, generateBaseWFormRules } from '/@/components/UI/Form'

  import { getMenuTableHeaders } from './headers'
  import { getMenuFormSchemas } from './schemas'
  import { getMaybeI18nMsg } from './utils'

  export default defineComponent({
    name: 'Menu',

    setup() {
      const tableData = ref<Menu[]>([])
      const total = ref(0)
      const treeData = ref<TreeNode<Menu>[]>([])

      const getTreeData = computed(() =>
        formatTree<Menu>(treeData.value, {
          format: (node) => ({ ...node, title: getMaybeI18nMsg(node.title) }),
        })
      )

      const menuFormData = ref<Partial<Menu> & { _id?: string }>({
        type: 'catalog',
        external: false,
        internal: false,
        cache: false,
        status: true,
        show: true,
      })

      const { menuFormSchemas } = getMenuFormSchemas(
        menuFormData,
        tableData,
        getTreeData
      )

      const { rules } = generateBaseWFormRules(menuFormSchemas)

      const [registerTable] = useTable({
        headers: getMenuTableHeaders(),
        data: tableData,
        total: total,
        rowKey: '_id',
        border: true,
        hasAction: true,
      })

      const [registerDialog, { openDialog, closeDialog }] = useDialog()

      const [registerForm, { validate, clearValidate, resetFields }] = useForm({
        schemas: menuFormSchemas,
        span: 23,
        rules: rules,
        labelWidth: '150px',
      })

      const onGetList = async () => {
        const res = await menuAPI.list()

        const treeMenu = orderTree<Menu>(
          arrToTree<Menu>(res.data, { id: '_id' })
        )

        treeData.value = treeMenu
        tableData.value = treeMenu[0].children as Menu[]
        total.value = res.total
      }

      const onCreate = (id: string) => {
        if (id) {
          menuFormData.value.pid = id
        }

        nextTick(() => {
          openDialog({
            title: 'Create Menu',
          })

          nextTick(async () => {
            await clearValidate()
          })
        })
      }

      const onUpdate = async (id: string) => {
        const res = await menuAPI.read(id)

        menuFormData.value = res

        nextTick(() => {
          openDialog({
            title: 'Update Menu',
          })

          nextTick(async () => {
            await clearValidate()
          })
        })
      }

      const onDelete = async (id: string) => {
        await menuAPI.delete(id)
        ElMessage.success('Success')
        await onGetList()
      }

      const onDialogCancel = async () => {
        await resetFields()

        menuFormData.value = {
          type: 'catalog',
          external: false,
          internal: false,
          cache: false,
          status: true,
          show: true,
        }

        closeDialog()

        await clearValidate()
      }

      const onDialogConfirm = async () => {
        if (menuFormData.value._id) {
          await menuAPI.update(menuFormData.value)
          ElMessage.success('Success')
        } else {
          await menuAPI.create(menuFormData.value)
          ElMessage.success('Success')
        }

        onDialogCancel()
        await onGetList()
      }

      onMounted(() => {
        onGetList()
      })

      return {
        menuFormData,

        registerTable,
        registerDialog,
        registerForm,

        onDialogCancel,
        onDialogConfirm,

        onCreate,
        onUpdate,
        onDelete,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
