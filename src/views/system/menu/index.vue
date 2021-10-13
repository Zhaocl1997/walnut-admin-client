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
    </w-table>

    <!-- <w-dialog
      @hook="registerDialog"
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
    >
      <w-form v-model="menuFormData" @hook="registerForm">
        <template #icon>
          <w-icon-picker v-model="menuFormData.icon" />
        </template>
      </w-form>
    </w-dialog> -->
  </div>
</template>

<script lang="ts">
  import type { Menu } from '/@/router/types'

  import { defineComponent, onMounted, ref, nextTick } from 'vue'
  import { arrToTree, orderTree } from 'easy-fns-ts'

  import { menuAPI } from '/@/api/system/menu'
  import { useMessage, useContinue } from '/@/hooks/component/useMessage'

  import { useTable } from '/@/components/UI/Table'
  // import { useDialog } from '/@/components/UI/Dialog'
  // import { useForm, generateBaseWFormRules } from '/@/components/UI/Form'

  import { getMenuTableHeaders } from './headers'
  import { getMenuFormSchemas } from './schemas'

  export default defineComponent({
    name: 'Menu',

    setup() {
      const total = ref(0)

      const tableData = ref<Menu[]>([])
      const treeData = ref<TreeDataItem<Menu>[]>([])

      const menuFormData = ref<Menu>({
        type: 'catalog',
        external: false,
        internal: false,
        cache: false,
        status: true,
        show: true,
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

      onMounted(() => {
        onGetList()
      })

      const { menuFormSchemas } = getMenuFormSchemas(
        menuFormData,
        tableData,
        treeData
      )

      const [registerTable] = useTable<Menu>({
        headers: getMenuTableHeaders(),
        data: tableData,
        total: total,
        rowKey: '_id',
        border: true,
        height: '600px',
        onAction: ({ scope, type }) => {
          const id = scope.row?._id!

          const action = {
            create: onCreate,
            edit: onUpdate,
            delete: onDelete,
          }

          action[type](id)
        },
        onEdit: async ({ row, prop, newValue, loadStart, loadEnd }) => {
          loadStart()
          const newData = Object.assign(row, { [prop]: newValue })
          await menuAPI.update(newData)
          useMessage({ type: 'success', message: 'Operation Success!' })
          loadEnd()
        },
      })

      // const [registerDialog, { openDialog, closeDialog }] = useDialog()

      // // form and rules
      // const { rules } = generateBaseWFormRules(menuFormSchemas)
      // const [registerForm, { validate, clearValidate, resetFields }] = useForm({
      //   schemas: menuFormSchemas,
      //   span: 23,
      //   rules: rules,
      //   labelWidth: '150px',
      // })

      // create
      const onCreate = (id: string) => {
        if (id) {
          menuFormData.value.pid = id
        }

        openDialog({
          title: 'Create Menu',
        })

        nextTick(() => {
          clearValidate()
        })
      }

      // update
      const onUpdate = async (id: string) => {
        const res = await menuAPI.read(id)

        menuFormData.value = res

        openDialog({
          title: 'Update Menu',
        })
      }

      // delete
      const onDelete = async (id: string) => {
        const next = await useContinue('Are you sure to delete this menu?')

        if (next) {
          await menuAPI.delete(id)
          useMessage({ type: 'success', message: 'Operation Success!' })
          await onGetList()
        }
      }

      // dialog cancel
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

      // dialog confirm
      const onDialogConfirm = async () => {
        const valid = await validate()

        console.log(1)

        if (valid) {
          if (menuFormData.value._id) {
            await menuAPI.update(menuFormData.value)
            useMessage({ type: 'success', message: 'Operation Success!' })
          } else {
            await menuAPI.create(menuFormData.value)
            useMessage({ type: 'success', message: 'Operation Success!' })
          }

          onDialogCancel()
          await onGetList()
        }
      }

      return {
        menuFormData,

        registerTable,
        registerDialog,
        registerForm,

        onDialogCancel,
        onDialogConfirm,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
