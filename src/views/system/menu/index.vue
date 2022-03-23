<template>
  <n-grid :x-gap="12">
    <n-gi :span="6">
      <w-card
        :segmented="{
          content: true,
        }"
      >
        <template #header>
          <WAppAuthorize value="system:menu:create">
            <n-dropdown
              trigger="hover"
              :onSelect="onDropDownSelect"
              :options="getDropdownOptions"
            >
              <template #>
                <n-button>
                  {{ t('app:button:create') }}

                  <template #icon>
                    <w-icon icon="ant-design:plus-outlined"></w-icon>
                  </template>
                </n-button>
              </template> </n-dropdown
          ></WAppAuthorize>
        </template>

        <template #>
          <w-tree v-model:value="treeMenuValue" @hook="registerTree"></w-tree>
        </template>
      </w-card>
    </n-gi>

    <n-gi :span="18">
      <w-card
        :segmented="{
          content: true,
        }"
      >
        <template #header>
          <div class="flex items-center">
            <w-icon
              :icon="
                actionType === 'create'
                  ? 'ant-design:plus-outlined'
                  : actionType === 'update'
                  ? 'ant-design:edit-outlined'
                  : 'ant-design:menu-outlined'
              "
              height="24"
              class="mr-1"
            >
            </w-icon>

            <span v-show="actionType === 'create'">{{ panelTitle }}</span>
            <span v-show="actionType === 'update'">
              {{
                formData.title
                  ? t('app:button:read') + ': ' + t(formData.title)
                  : t('page:menu:permission')
              }}
            </span>
            <span v-show="!actionType">{{ t('page:menu:defTitle') }}</span>
          </div>
        </template>

        <template #>
          <n-alert :title="t('page:menu:alert')" type="info" />

          <w-form
            v-if="treeMenuValue || actionType === 'create'"
            @hook="registerForm"
            :model="formData"
          ></w-form>
        </template>
      </w-card>
    </n-gi>
  </n-grid>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Menu',
  })
</script>

<script lang="tsx" setup>
  import type { DropdownOption } from 'naive-ui'

  import { omit } from 'lodash-es'

  import { menuAPI } from '/@/api/system/menu'
  import { useTree } from '/@/components/UI/Tree'

  import { useMenuFormSchema } from './useMenuFormSchema'
  import { useMenuTree } from '../role/useMenuTree'

  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  // ref
  const actionType = ref<ActionType>('')
  const treeMenuValue = ref<string>('')
  const panelTitle = ref<string>('')

  const { getLeftMenu, getTreeSelect, rootId, onInit } = useMenuTree()

  const [registerTree] = useTree<AppSystemMenu>({
    presetPrefixIcon: true,
    presetContextMenu: true,
    deletable: true,
    toolbar: true,
    maxHeight: '600px',

    auths: {
      delete: 'system:menu:delete',
      update: 'system:menu:update',
    },

    onTreeNodeItemDelete: async (deleted) => {
      await menuAPI.delete(deleted._id!)
      AppSuccess()
      await onInit()
    },

    onPaste(copy, current) {
      // paste is just reset the pid, also need to remove some fields

      formData.value = {
        ...omit(copy, ['_id', 'createdAt', 'updatedAt']),
        pid: current._id,
      }
      actionType.value = 'create'
    },

    treeProps: {
      // @ts-ignore
      data: getLeftMenu,
      keyField: '_id',
      blockLine: true,
      blockNode: true,

      filter: (pattern, node) => {
        if (
          node.title &&
          (node.title as string).toLowerCase().includes(pattern)
        ) {
          return true
        }
        return false
      },

      renderLabel: ({ option }) =>
        option.type === MenuTypeConst.ELEMENT
          ? (option.permission as string)
          : (option.title as string),
    },
  })

  // state
  const { stateRef: formData, resetState: resetFormData } =
    useState<AppSystemMenu>({
      type: 'catalog',
      status: true,

      path: null,
      name: null,
      component: null,

      title: null,
      icon: null,
      order: 0,
      ternal: 'none',
      url: null,
      cache: false,
      show: true,
      affix: false,
      permission: null,
      menuActiveName: null,
      menuActiveSameTab: false,
    })

  // schemas
  const schemas = useMenuFormSchema(actionType, formData, getTreeSelect)

  // form
  const [registerForm, { validate, restoreValidation }] =
    useForm<AppSystemMenu>({
      localeUniqueKey: 'menu',

      labelWidth: 140,

      span: 12,

      baseRules: true,

      schemas: [
        ...schemas,

        {
          type: 'Base:ButtonGroup',
          gridProp: {
            span: 24,
          },
          componentProp: {
            groups: [
              {
                textProp: () => t('app:button:save'),
                type: 'primary',
                auth: 'system:menu:update',
                onClick: async () => {
                  const isValid = await validate()

                  if (!isValid) return

                  await menuAPI[actionType.value](formData.value)
                  AppSuccess()
                  resetFormData()
                  await onInit()
                  treeMenuValue.value = ''
                  actionType.value = ''
                },
              },
              {
                textProp: () => t('app:button:reset'),
                onClick: async () => {
                  await restoreValidation()
                  resetFormData()
                  actionType.value = ''
                },
              },
            ],
          },
        },
      ],
    })

  // effect
  watchEffect(async () => {
    if (treeMenuValue.value) {
      const res = await menuAPI.read(treeMenuValue.value)
      actionType.value = 'update'
      formData.value = Object.assign(formData.value, res)
    }

    await restoreValidation()
  })

  const getDropdownOptions = computed<DropdownOption[]>(() => [
    {
      key: 'root',
      label: t('page:menu:dd1'),
      disabled: !!treeMenuValue.value,
    },
    {
      key: 'child',
      label: t('page:menu:dd2'),
      disabled: !treeMenuValue.value,
    },
  ])

  const onDropDownSelect = (key: string) => {
    const pid = formData.value._id
    actionType.value = 'create'
    resetFormData()

    switch (key) {
      case 'root':
        panelTitle.value = t('page:menu:dd1')
        formData.value.pid = rootId.value
        break

      case 'child':
        panelTitle.value = t('page:menu:dd2')
        formData.value.pid = pid
        break

      default:
        break
    }
  }
</script>
