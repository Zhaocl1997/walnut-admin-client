<script lang="ts" setup>
import type { AxiosRequestConfig } from 'axios'
import { HelloAPI, HelloAPIWithToken } from '@/api'
import { removeAllCancel, removeLatestRequest } from '@/utils/axios/src/adapters'

defineOptions({
  name: 'AxiosDemo',
  defaultView: false,
})

const withToken = ref(true)

async function _request(payload?: AxiosRequestConfig) {
  if (withToken.value) {
    const res = await HelloAPIWithToken(payload!)
    useAppMsgSuccess(res)
  }
  else {
    const res = await HelloAPI(payload!)
    useAppMsgSuccess(res)
  }
}

const pool: Record<number, Fn> = {
  1: () => {
    _request()
  },
  2: () => {
    _request({ _cache: true })
  },
  3: () => {
    _request({ _throttle: 1000 })
  },
  4: () => {
    _request({ _retryTimes: 3, _error: true })
  },
  5: () => {
    _request({ _timestamp: true })
  },
  6: () => {
    _request({ _carryToken: false })
  },
  7: () => {
    _request({ _demonstrate: true })
  },
  8: () => {
    _request({ _sleep: 5000 })
  },
  9: () => {
    _request({ _sleep: 5000 })
    _request({ _sleep: 5000 })
    _request({ _sleep: 5000 })

    const id = setTimeout(() => {
      removeLatestRequest()
      clearTimeout(id)
    }, 500)
  },
  10: () => {
    for (let i = 0; i < 10; i++) {
      const id = setTimeout(async () => {
        await _request({ _sleep: 10000, _timestamp: true })
        clearTimeout(id)
      }, i * 100)
    }

    const id = setTimeout(() => {
      removeAllCancel()
      clearTimeout(id)
    }, 2500)
  },
}

function onSend(type: number) {
  pool[type]()
}
</script>

<template>
  <WDemoCard title="Axios (See network tab)">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar">
          Send request with custum config
        </WTitle>

        <n-switch v-model:value="withToken">
          <template #checked>
            Endpoint need token
          </template>
          <template #unchecked>
            Endpoint public
          </template>
        </n-switch>

        <n-space size="small" class="mt-2">
          <n-button @click="onSend(1)">
            Send Request normally
          </n-button>
          <n-button @click="onSend(2)">
            Send Request with cache support
          </n-button>
          <n-button @click="onSend(3)">
            Send Request with throttle support (only GET method)
          </n-button>
          <n-button @click="onSend(4)">
            Send Request with retry support
          </n-button>
          <n-button @click="onSend(5)">
            Send Request with timestamp query
          </n-button>
          <n-button @click="onSend(6)">
            Send Request with not carry token
          </n-button>
          <n-button @click="onSend(7)">
            Send Request for demonstrate purpose
          </n-button>
          <n-button @click="onSend(8)">
            Send Request with sleep miliseconds(endpoint support)
          </n-button>
          <n-button @click="onSend(9)">
            Send Request with cancel support
          </n-button>
          <n-button @click="onSend(10)">
            Send Request with batch cancel support
          </n-button>
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
