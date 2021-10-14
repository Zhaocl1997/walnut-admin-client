<template>
  <el-card>
    <template #header>
      <w-title show-left>Persistent</w-title>
    </template>

    <el-row>
      <el-select v-model="type" @change="onStorageChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>

    <br />

    <el-row>
      <el-button type="primary" @click="onSet">Set</el-button>
      <el-button type="success" @click="onGet">Get</el-button>
      <el-button type="info" @click="onRemove">Remove</el-button>
      <el-button type="danger" @click="onClear">Clear</el-button>

      <el-button type="primary" @click="onSetObject"
        >Set Object(demo)</el-button
      >
      <el-button type="primary" @click="onSetArray">Set Array(demo)</el-button>
    </el-row>

    <br />

    <el-row>
      <el-select
        v-model="key"
        placeholder="Set/Get key"
        style="width: 100%;"
        clearable
        filterable
        allow-create
      >
        <el-option
          v-for="item in keyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>

    <br />

    <el-row>
      <el-input v-model="value" placeholder="Set value" clearable />
    </el-row>

    <br />

    <el-row>
      <WJson :value="displayValue"></WJson>
    </el-row>
  </el-card>
</template>

<script lang="ts">
  // import { ElMessage } from 'element-plus'
  import {
    setLocal,
    getLocal,
    clearLocal,
    removeLocal,
    setSession,
    getSession,
    clearSession,
    removeSession,
    setCookie,
    getCookie,
    clearCookie,
    removeCookie,
  } from '/@/utils/persistent'

  import { getAllKeys } from '/@/utils/persistent/utils'
  import { StorageTypeEnum } from '/@/enums/persistent'
  import { objectDemo, arrayDemo } from './demo'

  export default defineComponent({
    name: 'Persistent',

    setup() {
      const state = reactive({
        type: StorageTypeEnum.LOCAL_STORAGE,
        options: [
          {
            value: StorageTypeEnum.LOCAL_STORAGE,
            label: 'local storage',
          },
          {
            value: StorageTypeEnum.SESSION_STORAGE,
            label: 'session storage',
          },
          {
            value: StorageTypeEnum.COOKIES,
            label: 'cookies',
          },
        ],

        key: '',
        value: '',
        displayValue: '',

        keyOptions: [] as Recordable[],
      })

      const onSet = () => {
        if (!state.key || !state.value) {
          // ElMessage.warning('Please enter key/value!')
          return
        }

        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            setLocal(state.key, state.value)
            onGetKeyOptions(StorageTypeEnum.LOCAL_STORAGE)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            setSession(state.key, state.value)
            onGetKeyOptions(StorageTypeEnum.SESSION_STORAGE)
            break

          case StorageTypeEnum.COOKIES:
            setCookie(state.key, state.value)
            onGetKeyOptions(StorageTypeEnum.COOKIES)
            break

          default:
            break
        }

        onResetState()
      }

      const onGet = () => {
        if (!state.key) {
          // ElMessage.warning('Please enter key!')
          return
        }
        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            state.displayValue = getLocal(state.key)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            state.displayValue = getSession(state.key)
            break

          case StorageTypeEnum.COOKIES:
            state.displayValue = getCookie(state.key)
            break

          default:
            break
        }
      }

      const onRemove = () => {
        if (!state.key) {
          // ElMessage.warning('Please enter key!')
          return
        }
        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            removeLocal(state.key)
            onGetKeyOptions(StorageTypeEnum.LOCAL_STORAGE)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            removeSession(state.key)
            onGetKeyOptions(StorageTypeEnum.SESSION_STORAGE)
            break

          case StorageTypeEnum.COOKIES:
            removeCookie(state.key)
            onGetKeyOptions(StorageTypeEnum.COOKIES)
            break

          default:
            break
        }
        onResetState()
      }

      const onClear = () => {
        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            clearLocal()
            onGetKeyOptions(StorageTypeEnum.LOCAL_STORAGE)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            clearSession()
            onGetKeyOptions(StorageTypeEnum.SESSION_STORAGE)
            break

          case StorageTypeEnum.COOKIES:
            clearCookie()
            onGetKeyOptions(StorageTypeEnum.COOKIES)
            break

          default:
            break
        }

        onResetState()
      }

      const onSetObject = () => {
        if (!state.key) {
          // ElMessage.warning('Please enter key!')
          return
        }

        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            setLocal(state.key, objectDemo)
            onGetKeyOptions(StorageTypeEnum.LOCAL_STORAGE)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            setSession(state.key, objectDemo)
            onGetKeyOptions(StorageTypeEnum.SESSION_STORAGE)
            break

          case StorageTypeEnum.COOKIES:
            setCookie(state.key, objectDemo)
            onGetKeyOptions(StorageTypeEnum.COOKIES)
            break

          default:
            break
        }
        onResetState()
      }

      const onSetArray = () => {
        if (!state.key) {
          // ElMessage.warning('Please enter key!')
          return
        }

        switch (state.type) {
          case StorageTypeEnum.LOCAL_STORAGE:
            setLocal(state.key, arrayDemo)
            onGetKeyOptions(StorageTypeEnum.LOCAL_STORAGE)
            break

          case StorageTypeEnum.SESSION_STORAGE:
            setSession(state.key, arrayDemo)
            onGetKeyOptions(StorageTypeEnum.SESSION_STORAGE)
            break

          case StorageTypeEnum.COOKIES:
            setCookie(state.key, arrayDemo)
            onGetKeyOptions(StorageTypeEnum.COOKIES)
            break

          default:
            break
        }
        onResetState()
      }

      const onGetKeyOptions = (storage = StorageTypeEnum.LOCAL_STORAGE) => {
        const keys = getAllKeys(storage)
        state.keyOptions = []
        keys.map((key) => {
          state.keyOptions.push({ value: key, label: key })
        })
      }

      const onStorageChange = (val: StorageTypeEnum) => {
        onGetKeyOptions(val)
        onResetState()
      }

      const onResetState = () => {
        state.key = ''
        state.value = ''
        state.displayValue = ''
      }

      onMounted(() => {
        onGetKeyOptions()
      })

      return {
        ...toRefs(state),

        onStorageChange,

        onSet,
        onGet,
        onClear,
        onRemove,
        onSetObject,
        onSetArray,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
