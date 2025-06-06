<script lang="ts" setup>
import type { WForm } from '@/components/UI/Form'

import { menuAPI } from '@/api/system/menu'
import { useTree } from '@/components/UI/Tree'
import { omit } from 'lodash-es'
import { useMenuTree } from '../role/useMenuTree'
import { useMenuFormSchema } from './useMenuFormSchema'

defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
})

const keyField = '_id'

const { t } = useAppI18n()

// ref
const actionType = ref<IActionType>('create')
const targetTreeItem = ref<string>('')

const loading = ref(false)

// state
const { stateRef: formData, resetState: resetFormData, commit } = useState<AppSystemMenu>({
  type: 'catalog',
  status: true,

  path: '',
  name: '',
  component: '',

  title: '',
  icon: '',
  order: 0,
  ternal: 'none',
  url: '',
  cache: true,
  show: true,
  affix: false,
  permission: '',
  menuActiveName: '',
  menuActiveSameTab: false,

  activeIcon: '',
  badge: '',
  animationName: '',
})

commit()

const { getLeftMenu, getTreeSelect, onInit, menuActiveNamesOptions }
    = useMenuTree()

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
    await menuAPI.delete(deleted[keyField]!)
    useAppMsgSuccess()
    await onInit()
    targetTreeItem.value = ''
    resetFormData()
  },

  onPaste(copy, current) {
    // paste is just reset the pid, also need to remove some fields

    resetFormData()

    formData.value = {
      ...omit(copy, [keyField, 'createdAt', 'updatedAt']),
      pid: current[keyField],
    }

    targetTreeItem.value = ''
    actionType.value = 'create'
  },

  treeProps: {
    // @ts-expect-error actually works
    data: getLeftMenu,
    keyField,
    blockLine: true,
    blockNode: true,
    disabled: computed(() => loading.value),

    filter: (pattern, node) => {
      if (
        node.title
        && (node.title as string).toLowerCase().includes(pattern)
      ) {
        return true
      }

      return false
    },

    renderLabel: ({ option }) =>
      option.type === AppConstMenuType.ELEMENT
        ? (option.permission as string)
        : (option.title as string),
  },
})

// schemas
const schemas = useMenuFormSchema(
  actionType,
  formData,
  getTreeSelect,
  menuActiveNamesOptions,
)

// form
const [register, { validate, restoreValidation }] = useForm<AppSystemMenu>({
  localeUniqueKey: 'menu',

  labelWidth: 140,

  span: 12,

  baseRules: true,

  disabled: computed(() => loading.value),

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
            textProp: () => t('app.button.save'),
            type: 'primary',
            auth: computed(() => `system:menu:${actionType.value}`),
            loading,
            disabled: loading,
            onClick: async () => {
              const isValid = await validate()

              if (!isValid)
                return

              loading.value = true

              try {
                await menuAPI[actionType.value](omit(formData.value, 'children'))
                useAppMsgSuccess()
                await onInit()
                targetTreeItem.value = ''
                resetFormData()
              }
              finally {
                loading.value = false
              }
            },
          },
          {
            textProp: () => t('app.button.reset'),
            auth: computed(() => `system:menu:${actionType.value}`),
            loading,
            disabled: loading,
            onClick: async () => {
              await restoreValidation()
              targetTreeItem.value = ''
              resetFormData()
            },
          },
        ],
      },
    },
  ] as IDeepMaybeRef<WForm.Schema.Item<AppSystemMenu>>[],
})

watch(
  () => targetTreeItem.value,
  async () => {
    if (targetTreeItem.value) {
      const res = await menuAPI.read(targetTreeItem.value)
      actionType.value = 'update'
      formData.value = Object.assign(formData.value, res)
    }
    else {
      actionType.value = 'create'
    }

    restoreValidation()
  },
)
</script>

<template>
  <n-grid :x-gap="12">
    <n-gi :span="6">
      <n-card
        :segmented="{
          content: true,
          footer: 'soft',
        }"
      >
        <template #default>
          <WTree v-model:value="targetTreeItem" @hook="registerTree" />
        </template>
      </n-card>
    </n-gi>

    <n-gi :span="18">
      <n-card
        :segmented="{
          content: true,
          footer: 'soft',
        }"
      >
        <template #default>
          <n-alert :title="t('page.menu.alert')" type="info" class="mb-4" />

          <div v-show="actionType">
            <WForm
              :model="formData"
              @hook="register"
            />
          </div>
        </template>
      </n-card>
    </n-gi>
  </n-grid>
</template>
