<template>
  <div>
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="ts" setup>
  import type { WCrud } from './types'

  import { isFunction } from 'easy-fns-ts'
  import { useProps } from '/@/hooks/core/useProps'
  import { extractDefaultFormDataFromSchemas } from '/@/components/UI/Form/src/utils'

  interface InternalProps extends WCrud.Props {}

  const prop = defineProps<InternalProps>()

  const emit = defineEmits(['hook'])

  const { setProps, getProps } = useProps<InternalProps>(prop)

  // emit
  emit('hook', { setProps })

  // ref
  const actionType = ref<ActionType>('')

  // state
  const defaultCreateAndUpdateFormData = extractDefaultFormDataFromSchemas(
    getProps.value.formProps?.schemas!
  )

  const { stateRef: formData, resetState: resetFormData } = useState(
    defaultCreateAndUpdateFormData
  )

  const onTableOpenCreateForm = () => {
    actionType.value = 'create'

    onOpen((done) => done())
  }

  const onApiTableReadAndOpenUpdateForm = async (id: string) => {
    actionType.value = 'update'

    onOpen(async (done) => {
      try {
        const res = await api.read(id)
        formData.value = Object.assign(formData.value, res)
      } finally {
        done()
      }
    })
  }

  // api
  const api = getProps.value.baseAPI!

  // table
  const [
    registerTable,
    {
      onApiTableList,
      onApiTableDelete,
      onApiTableDeleteMany,
      onGetApiTableListParams,
    },
    // @ts-ignore
  ] = useTable({
    ...getProps.value.tableProps,

    apiProps: {
      onBeforeRequest: isFunction(getProps.value.onBeforeRequest)
        ? (query) => {
            return getProps.value.onBeforeRequest!(query)!
          }
        : undefined,

      listApi: api.list.bind(api),

      deleteApi: api.delete.bind(api),

      deleteManyApi: api.deleteMany.bind(api),
    },
  })

  // emit
  emit('hook', {
    setProps,
    onTableOpenCreateForm,
    onApiTableReadAndOpenUpdateForm,
    onApiTableDelete,
    onApiTableDeleteMany,
    onGetFormData: () => formData,
    onGetActionType: () => actionType,
    onGetApiTableListParams: () => onGetApiTableListParams(),
  })

  // form
  // @ts-ignore
  const [registerForm, { onOpen }] = useForm({
    ...getProps.value.formProps,

    advancedProps: {
      ...getProps.value.formProps?.advancedProps,
      width: getProps.value.formProps?.advancedProps?.width ?? 500,
      actionType,
      onYes: async (apiHandler) => {
        await apiHandler(
          // Form API Solution 1
          api[actionType.value].bind(api),
          // Form API Solution 2
          // (data) => AppAxios.put({ url: '/system/locale', data }),
          formData.value!
        )
        resetFormData()
        await onApiTableList()
      },
      onNo: (done) => {
        resetFormData()
        done()
      },
    },
  })
</script>
