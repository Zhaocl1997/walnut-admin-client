<script lang="ts" setup>
import { url } from './url'
import type { WSignPadInst } from '@/components/Vendor/SignPad'

defineOptions({
  name: 'SignPadDemo',
})

const signPadRef = ref<WSignPadInst>()

const imageSrc = ref()

async function onGet() {
  imageSrc.value = await signPadRef.value?.getImage()
}
</script>

<template>
  <div>
    <w-demo-card title="Signature Pad Demo">
      <n-list>
        <n-list-item>
          <w-title prefix="bar">
            Basic
          </w-title>

          <w-sign-pad height="300px" width="800px" />
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <w-title prefix="bar">
            Disabled
          </w-title>

          <w-sign-pad
            height="300px"
            width="800px"
            :default-url="url"
            disabled
          />
        </n-list-item>
      </n-list>

      <n-list>
        <n-list-item>
          <n-space vertical size="small">
            <w-title prefix="bar">
              Watermark
            </w-title>

            <n-button @click="onGet">
              Get Picture
            </n-button>

            <n-image :src="imageSrc" />

            <w-sign-pad
              ref="signPadRef"
              height="300px"
              width="800px"
              content="walnut admin"
            />
          </n-space>
        </n-list-item>
      </n-list>
    </w-demo-card>
  </div>
</template>
