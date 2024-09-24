<script lang="ts" setup>
defineOptions({
  name: 'OSSUploadDemo',
})

const state = ref<any>({
  fileList2: ['test-png.png', 'test-docx.docx', 'test-pdf.pdf'],
  fileList3: ['test-png.png', 'test-docx.docx', 'test-pdf.pdf'],
  fileList6: ['person.jpg', 'furniture.jpg'],
  fileList7: ['city.jpg', 'football.jpg'],
})
</script>

<template>
  <WDemoCard title="Highly packaged ali oss use demo">
    <n-list>
      <n-list-item>
        <WDemoCard title="Basic Usage">
          <WJSON :value="state.fileList1" />

          <w-OSS-upload v-model:value="state.fileList1" />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Feedback">
          <WJSON :value="state.fileList2" />

          <w-OSS-upload v-model:value="state.fileList2" />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Disabled">
          <WJSON :value="state.fileList3" />

          <w-OSS-upload v-model:value="state.fileList3" disabled />
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

          <w-OSS-upload
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

          <w-OSS-upload
            v-model:value="state.fileList5"
            image
            :size="1024"
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Image Upload Feedback">
          <WJSON :value="state.fileList6" />

          <w-OSS-upload
            v-model:value="state.fileList6"
            image
            :size="1024"
          />
        </WDemoCard>
      </n-list-item>

      <n-list-item>
        <WDemoCard title="Image Upload Disabled">
          <WJSON :value="state.fileList7" />

          <w-OSS-upload
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

          <w-OSS-upload
            v-model:value="state.fileList8"
            :size="1024 * 100"
            :crossover-size="1024 * 5"
          />
        </WDemoCard>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
