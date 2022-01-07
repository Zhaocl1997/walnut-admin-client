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

  interface InternalProps extends WCrud.Props {}

  const prop = defineProps<InternalProps>()

  const emit = defineEmits(['hook'])

  const { setProps, getProps } = useProps<InternalProps>(prop)

  // emit
  emit('hook', { setProps })

  // ref
  const actionType = ref<ActionType>('')

  const onCreateAndOpen = () => {
    actionType.value = 'create'
    const { done } = onOpen()
    done()
  }

  const onReadAndOpen = async (id: string) => {
    actionType.value = 'update'
    const { done } = onOpen()
    try {
      const res = await api.read(id)
      formData.value = res
    } finally {
      done()
    }
  }

  // state
  const { stateRef: formData, resetState: resetFormData } = useState(
    getProps.value.defaultFormData ?? {}
  )

  // api
  const api = getProps.value.baseAPI!

  // table
  // @ts-ignore
  const [registerTable, { onInit, onDelete, onDeleteMany }] = useTable({
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
    onCreateAndOpen,
    onReadAndOpen,
    onDelete,
    onDeleteMany,
  })

  // form
  // @ts-ignore
  const [registerForm, { onOpen }] = useForm({
    ...getProps.value.formProps,

    advancedProps: {
      actionType,
      width: 500,
      onYes: async (apiHandler) => {
        await apiHandler(
          // Form API Solution 1
          api[actionType.value].bind(api),
          // Form API Solution 2
          // (data) => AppAxios.put({ url: '/system/locale', data }),
          formData.value!
        )
        resetFormData()
        await onInit()
      },
      onNo: (done) => {
        resetFormData()
        done()
      },
    },
  })
</script>