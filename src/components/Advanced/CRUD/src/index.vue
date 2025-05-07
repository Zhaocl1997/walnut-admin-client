<script lang="ts" setup>
import type { WCrud } from './types'
import { isFunction } from 'easy-fns-ts'

interface InternalProps extends WCrud.Props { }

const prop = defineProps<InternalProps>()

const emit = defineEmits(['hook'])

const { setProps, getProps } = useProps<InternalProps>(prop)

// emit
emit('hook', { setProps })

// ref
const actionType = ref<IActionType>('')

const { stateRef: formData, resetState: resetFormData } = useState({})

function onTableOpenCreateForm(defaultFormData: any) {
  actionType.value = 'create'

  defaultFormData && (formData.value = defaultFormData)

  onOpen(done => done())
}

async function onApiTableReadAndOpenUpdateForm(id: string) {
  actionType.value = 'update'

  onOpen(async (done) => {
    try {
      const res = await api.read(id)
      formData.value = Object.assign(formData.value, res)
    }
    finally {
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
  // @ts-expect-error
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
  onApiTableList,
  onTableOpenCreateForm,
  onApiTableReadAndOpenUpdateForm,
  onApiTableDelete,
  onApiTableDeleteMany,
  onGetFormData: () => formData,
  onGetActionType: () => actionType,
  onGetApiTableListParams: () => onGetApiTableListParams(),
  onApiTableCloseForm: () => onClose(),
})

// form
// @ts-expect-error
const [registerForm, { onOpen, onClose }] = useForm({
  ...getProps.value.formProps,

  advancedProps: {
    ...getProps.value.formProps?.advancedProps,
    width: getProps.value.formProps?.advancedProps?.width ?? '500px',
    actionType,
    onYes: async (apiHandler) => {
      await apiHandler(
        // Form API Solution 1
        api[actionType.value].bind(api),
        // Form API Solution 2
        // (data) => AppAxios.put({ url: '/system/locale', data }),
        formData.value!,
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

<template>
  <div>
    <w-table @hook="registerTable" />

    <w-form v-if="getProps.formProps" :model="formData" @hook="registerForm" />
  </div>
</template>
