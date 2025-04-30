<script lang="ts" setup>
defineOptions({
  name: 'OSSUploadDemo',
})

const configData = ref({
  disabled: false,
  max: 3,
  size: 1024,
  crossoverSize: 1024 * 5,
  download: true,
  remove: true,
  preview: true,
})

const [register] = useForm<typeof configData.value>({
  span: 12,
  xGap: 20,
  schemas: [
    {
      type: 'Base:Switch',
      formProp: {
        path: 'disabled',
        label: 'Disabled',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'download',
        label: 'Download',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'remove',
        label: 'Remove',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'preview',
        label: 'Preview',
      },
    },
    {
      type: 'Raw:Slider',
      formProp: {
        path: 'max',
        label: 'Max file count',
      },
      componentProp: {
        min: 0,
        max: 10,
      },
    },
    {
      type: 'Raw:Slider',
      formProp: {
        path: 'size',
        label: 'File KB limit',
      },
      componentProp: {
        min: 0,
        max: 8192,
        step: 1024,
      },
    },
    {
      type: 'Raw:Slider',
      formProp: {
        path: 'crossoverSize',
        label: 'Threhold to trigger multipart upload',
      },
      componentProp: {
        min: 1024,
        max: 8192,
        step: 1024,
      },
    },
  ],
})

const formData = ref<Recordable>({
  fileList1: ['city.jpg', 'football.jpg'],
  fileList2: ['test-png.png', 'test-docx.docx', 'test-pdf.pdf'],
  // fileList3: ['test-png.png', 'test-docx.docx', 'test-pdf.pdf'],
  // fileList6: ['person.jpg', 'furniture.jpg'],
  // fileList7: ['city.jpg', 'football.jpg'],
})
</script>

<template>
  <WDemoCard title="Highly packaged ali oss use demo">
    <n-list>
      <n-list-item>
        <WDemoCard title="Basic Usage">
          <WForm :model="configData" @hook="register" />

          <WJSON :value="formData.fileList1" />

          <n-space vertical>
            <WOSSUpload
              v-model:value="formData.fileList1"
              image
              :disabled="configData.disabled"
              :max="configData.max"
              :size="configData.size"
              :crossover-size="configData.crossoverSize"
              :download="configData.download"
              :remove="configData.remove"
              :preview="configData.preview"
            />

            <WOSSUpload
              v-model:value="formData.fileList2"
              :disabled="configData.disabled"
              :max="configData.max"
              :size="configData.size"
              :crossover-size="configData.crossoverSize"
              :download="configData.download"
              :remove="configData.remove"
              :preview="configData.preview"
            />
          </n-space>
        </WDemoCard>
      </n-list-item>

      <!-- <n-list-item>
        <WDemoCard title="Feedback">
          <WJSON :value="state.fileList2" />

          <WOSSUpload v-model:value="state.fileList2" />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Disabled">
          <WJSON :value="state.fileList3" />

          <WOSSUpload v-model:value="state.fileList3" disabled />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard
          title="Limitations"
          :description="[
            'Default `max` is 10. (demo is set to 2)',
            'Use `max` to controll maxinum file number to upload. (demo is set to doc/docx)',
            'Use `accept` to controll file type to upload.',
          ]"
        >
          <WJSON :value="state.fileList4" />

          <WOSSUpload
            v-model:value="state.fileList4"
            :max="2"
            accept=".doc,.docx"
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard
          title="Image Upload"
          :description="['Set `image` true will use upload image card style']"
        >
          <WJSON :value="state.fileList5" />

          <WOSSUpload
            v-model:value="state.fileList5"
            image
            :size="1024"
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Image Upload Feedback">
          <WJSON :value="state.fileList6" />

          <WOSSUpload
            v-model:value="state.fileList6"
            image
            :size="1024"
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Image Upload Disabled">
          <WJSON :value="state.fileList7" />

          <WOSSUpload
            v-model:value="state.fileList7"
            image
            :size="1024"
            disabled
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard
          title="Large file multipart upload"
          :description="[
            'Default `size` is 10M, default `crossover-size` is 10M.',
            'Use `size` to controll maxinum file size in KB. (demo is set for 100M)',
            'Use `crossover-size` to decide whether to use ali-oss multipart upload. (demo is set for 5M)',
          ]"
        >
          <WJSON :value="state.fileList8" />

          <WOSSUpload
            v-model:value="state.fileList8"
            :size="1024 * 100"
            :crossover-size="1024 * 5"
          />
        </WDemoCard>
      </n-list-item> -->
    </n-list>
  </WDemoCard>
</template>
