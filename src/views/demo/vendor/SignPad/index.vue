<template>
  <div>
    <w-demo-card title="Signature Pad Demo">
      <n-list>
        <n-list-item>
          <w-title prefix="bar"> Basic </w-title>

          <w-sign-pad height="300px" width="800px"></w-sign-pad>
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <w-title prefix="bar"> Disabled </w-title>

          <w-sign-pad
            height="300px"
            width="800px"
            :default-url="url"
            disabled
          ></w-sign-pad>
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <n-space vertical size="small">
            <w-title prefix="bar"> Watermark </w-title>

            <n-button @click="onGet">Get Picture</n-button>

            <n-image :src="imageSrc"></n-image>

            <w-sign-pad
              ref="signPadRef"
              height="300px"
              width="800px"
              content="walnut admin"
            ></w-sign-pad>
          </n-space>
        </n-list-item>
      </n-list>
    </w-demo-card>
  </div>
</template>

<script lang="ts" setup>
  import type { WSignPadInst } from '@/components/Vendor/SignPad'
  import { url } from './url'

  const signPadRef = ref<WSignPadInst>()

  const imageSrc = ref()

  const onGet = async () => {
    imageSrc.value = await signPadRef.value?.getImage()
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'SignPadDemo',
  })
</script>
