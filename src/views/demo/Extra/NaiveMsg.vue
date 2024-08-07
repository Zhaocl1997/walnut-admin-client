<script lang="ts" setup>
defineOptions({
  name: 'NaiveMsgDemo',
  defaultView: false,
})

const appNaive = useAppStoreNaive()

function onOpenNoti(type: number) {
  type === 1 && useAppNotiSuccess('Notification Success')
  type === 2 && useAppNotiInfo('Notification Info', { closable: false })
  type === 3 && useAppNotiWarning('Notification Warning', { duration: 1000 })
  type === 4
  && useAppNotiError('Notification Error', { placement: 'top-left' })
  type === 5 && useAppNotiError('Got a 64px margin top', { containerStyle: { marginTop: '64px' } })
  type === 6 && appNaive.destroyCurrentNotiInst()
  type === 7 && appNaive.destroyAllNotiInst()
}

function onOpenMsg(type: number) {
  type === 1 && useAppMsgSuccess()
  type === 2 && useAppMsgInfo('Message Info', { closable: false })
  type === 3 && useAppMsgWarning('Message Warning', { duration: 1000 })
  type === 4 && useAppMsgError('Message Error', { placement: 'top-left' })
}

async function onOpenComfirm() {
  const res = await useAppConfirm('Do you want to continue?')

  if (res)
    useAppMsgSuccess()
  else
    useAppMsgInfo('Canceled')
}
</script>

<template>
  <w-demo-card title="Naive UI message/notification/confirm usage">
    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="`placement` works for all current notification instances, so be careful when use `placement` prop."
        >
          Notification
        </w-title>

        <n-space size="small">
          <n-button @click="onOpenNoti(1)">
            Success (default is 5s)
          </n-button>
          <n-button @click="onOpenNoti(2)">
            Info (not closable)
          </n-button>
          <n-button @click="onOpenNoti(3)">
            Warning (1s)
          </n-button>
          <n-button @click="onOpenNoti(4)">
            Error (position: top-right)
          </n-button>
          <n-button @click="onOpenNoti(5)">
            Error (containerStyle: margin)
          </n-button>
          <n-button @click="onOpenNoti(6)">
            Close current noti
          </n-button>
          <n-button @click="onOpenNoti(7)">
            Close all noti
          </n-button>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title
          prefix="bar"
          help-message="`placement` works for all current message instances, so be careful when use `placement` prop."
        >
          Message
        </w-title>

        <n-space size="small">
          <n-button @click="onOpenMsg(1)">
            Success (default is 3s)
          </n-button>
          <n-button @click="onOpenMsg(2)">
            Info (not closable)
          </n-button>
          <n-button @click="onOpenMsg(3)">
            Warning (1s)
          </n-button>
          <n-button @click="onOpenMsg(4)">
            Error (position: top-right)
          </n-button>
        </n-space>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Confirm
        </w-title>

        <n-space size="small">
          <n-button @click="onOpenComfirm">
            Need confirm to continue
          </n-button>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
