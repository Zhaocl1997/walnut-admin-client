<script lang="ts" setup>
import type { WVerifyInst } from '@/components/Extra/Verify'

const verify = ref<WVerifyInst>()
const verify2 = ref<WVerifyInst>()

const onSuccess = () => {
  useAppMessage().success('Success')
}

const onFail = () => {
  useAppMessage().error('Fail')
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'VerifyDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Simple Verify with no endpoint support">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <w-button @click="verify.onOpenModal()">
          Verify
        </w-button>

        <WVerify ref="verify" @success="onSuccess" @fail="onFail" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Custom images
        </w-title>

        <w-button @click="verify2.onOpenModal()">
          Verify
        </w-button>

        <WVerify
          ref="verify2"
          :imgs="[
            '/assets/auth_bg.jpg',
            'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF',
          ]"
          @success="onSuccess"
          @fail="onFail"
        />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
