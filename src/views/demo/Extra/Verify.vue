<script lang="ts" setup>
import type { WVerifyInst } from '@/components/Extra/Verify'

defineOptions({
  name: 'VerifyDemo',
  defaultView: false,
})

const verify = shallowRef<WVerifyInst>()
const verify2 = shallowRef<WVerifyInst>()

function onSuccess() {
  useAppMessage().success('Success')
}

function onFail() {
  useAppMessage().error('Fail')
}
</script>

<template>
  <WDemoCard title="Simple Verify with no endpoint support">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <n-button @click="verify!.onOpenModal()">
          Verify
        </n-button>

        <WVerify ref="verify" @success="onSuccess" @fail="onFail" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Custom images
        </WTitle>

        <n-button @click="verify2!.onOpenModal()">
          Verify
        </n-button>

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
  </WDemoCard>
</template>
