<script lang="ts" setup>
import type { WDescriptionsItem } from '@/components/UI/Descriptions'
import pkg from '/package.json'

const { t } = useAppI18n()

const { lastBuildTime } = __APP_INFO__

const infoItems = computed<WDescriptionsItem[]>(
  () =>
    [
      {
        label: t('desc.about.info.version'),
        value: pkg.version,
        type: 'tag',
        typeProps: {
          type: 'primary',
        },
      },
      {
        label: t('desc.about.info.doc'),
        value: t('desc.about.info.doc'),
        type: 'link',
        typeProps: {
          type: 'primary',
          link: URLS.docUrl,
        },
      },
      {
        label: t('desc.about.info.preview'),
        value: t('desc.about.info.preview'),
        type: 'link',
        typeProps: {
          type: 'primary',
          link: URLS.onlinePreview,
        },
      },
      {
        label: t('desc.about.info.code'),
        value: t('desc.about.info.code'),
        type: 'link',
        typeProps: {
          type: 'primary',
          link: URLS.myGithub,
        },
      },
      {
        label: t('desc.about.info.buildTime'),
        value: lastBuildTime,
        type: 'tag',
        typeProps: {
          type: 'info',
        },
      },
    ] as WDescriptionsItem[],
)

const DepItems = ref<WDescriptionsItem[]>(
  Object.entries(pkg.dependencies).map(([k, v]) => ({
    label: k,
    value: v,
    type: 'link',
    typeProps: { type: 'info', link: `https://www.npmjs.com/package/${k}` },
  })) as WDescriptionsItem[],
)

const DevDepItems = ref<WDescriptionsItem[]>(
  Object.entries(pkg.devDependencies).map(([k, v]) => ({
    label: k,
    value: v,
    type: 'link',
    typeProps: { type: 'info', link: `https://www.npmjs.com/package/${k}` },
  })) as WDescriptionsItem[],
)
</script>

<script lang="ts">
export default defineComponent({
  name: 'About',
})
</script>

<template>
  <div class="space-y-2">
    <w-card
      :title="t('about.title.info')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="infoItems"
      />
    </w-card>

    <w-card
      :title="t('about.title.deps')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="DepItems"
        :label-style="{ width: '400px' }"
      />
    </w-card>

    <w-card
      :title="t('about.title.devdeps')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <w-descriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="DevDepItems"
        :label-style="{ width: '400px' }"
      />
    </w-card>
  </div>
</template>
