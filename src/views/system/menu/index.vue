<template>
  <n-grid :x-gap="12">
    <n-gi :span="6">
      <n-card
        :segmented="{
          content: 'soft',
        }"
      >
        <template #header>
          <n-space>
            <PrimaryButton />

            <SecondaryButton />
          </n-space>
        </template>

        <template #>
          <MenuTree ref="menuTreeRef" v-model:value="selectedMenuId" />
        </template>
      </n-card>
    </n-gi>

    <n-gi :span="18">
      <n-card
        :segmented="{
          content: 'soft',
        }"
      >
        <template #header>
          <PanelHeader />
        </template>

        <template #>
          <n-alert :title="t('page:menu:alert')" type="info" />

          <w-form
            v-show="selectedMenuId || actionType === 'create'"
            @hook="registerForm"
            :model="formData"
          ></w-form>
        </template>
      </n-card>
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

  import { menuAPI } from '/@/api/system/menu'

  import { useMenuFormSchema } from './useMenuFormSchema'

  import MenuTree from '../role/MenuTree.vue'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'
  import WArrow from '/@/components/Extra/Arrow'
  import { NButton, NDropdown } from 'naive-ui'

  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  // type
  type DropDownKey = 'root' | 'child'

  // ref
  const actionType = ref<ActionType>('')
  const menuTreeRef = ref()

  const selectedMenuId = ref<string>('')
  const panelTitle = ref<string>('')

  // state
  const { stateRef: formData, resetState: resetFormData } = useState<AppMenu>({
    type: 'catalog',
    ternal: 'none',
    order: 0,
    cache: false,
    status: true,
    show: true,
    affix: false,
  })

  // effect
  watchEffect(async () => {
    if (selectedMenuId.value) {
      const res = await menuAPI.read(selectedMenuId.value)
      actionType.value = 'update'
      formData.value = res
    } else {
      actionType.value = ''
    }
  })

  // schemas
  const schemas = useMenuFormSchema({ actionType, formData, menuTreeRef })

  // form
  const [registerForm, { validate, restoreValidation }] = useForm<AppMenu>({
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
              textProp: computed(() => t('app:button:save')),
              type: 'primary',
              onClick: async () => {
                const isValid = await validate()

                if (!isValid) return

                await menuAPI[actionType.value](formData.value)
                AppSuccess()
                resetFormData()
                await menuTreeRef.value.onRefresh()
                selectedMenuId.value = ''
                actionType.value = ''
              },
            },
            {
              textProp: computed(() => t('app:button:reset')),
              onClick: () => {
                restoreValidation()
                resetFormData()
              },
            },
          ],
        },
      },
    ],
  })

  // components
  const PrimaryButton = defineComponent({
    setup() {
      const getDropdownOptions = computed<DropdownOption[]>(() => [
        {
          key: 'root',
          label: t('page:menu:dd1'),
          disabled: !!selectedMenuId.value,
        },
        {
          key: 'child',
          label: t('page:menu:dd2'),
          disabled: !selectedMenuId.value,
        },
      ])

      const onDropDownSelect = (key: DropDownKey) => {
        const pid = formData.value._id
        actionType.value = 'create'
        resetFormData()

        switch (key) {
          case 'root':
            panelTitle.value = t('page:menu:dd1')
            // setFormData({ pid: menuTreeRef.value.onGetRootId() })
            formData.value.pid = menuTreeRef.value.onGetRootId()
            break

          case 'child':
            panelTitle.value = t('page:menu:dd2')
            // setFormData({ pid })
            formData.value.pid = pid
            break

          default:
            break
        }
      }

      return () => (
        <NDropdown
          trigger="hover"
          onSelect={onDropDownSelect}
          options={getDropdownOptions.value}
        >
          <NButton>
            {{
              default: () => t('app:button:create'),
              icon: () => <WIcon icon="ant-design:plus-outlined"></WIcon>,
            }}
          </NButton>
        </NDropdown>
      )
    },
  })

  const SecondaryButton = defineComponent({
    setup() {
      const expandAll = ref(false)

      const onExpand = () => {
        menuTreeRef.value.onExpandAll()
        expandAll.value = menuTreeRef.value.onGetExpandStatus()
      }

      return () => (
        <NButton onClick={onExpand} icon-placement="right">
          {{
            default: () =>
              expandAll.value
                ? t('app:button:collapseAll')
                : t('app:button:expandAll'),
            icon: () => <WArrow active={expandAll.value}></WArrow>,
          }}
        </NButton>
      )
    },
  })

  const PanelHeader = defineComponent({
    setup() {
      return () => (
        <>
          <WIcon
            icon={
              actionType.value === 'create'
                ? 'ant-design:plus-outlined'
                : actionType.value === 'update'
                ? 'ant-design:edit-outlined'
                : 'ant-design:menu-outlined'
            }
            height="24"
            class="-mb-1.5 mr-1"
          />

          {actionType.value === 'create' && <span>{panelTitle.value}</span>}
          {actionType.value === 'update' && (
            <span>
              {t('app:button:read')}：{t(formData.value.title!)}
            </span>
          )}
          {actionType.value === '' && <span>{t('page:menu:defTitle')}</span>}
        </>
      )
    },
  })
</script>
