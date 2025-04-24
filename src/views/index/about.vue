<script lang="ts" setup>
import type { ICompUIDescriptionsItem } from '@/components/UI/Descriptions'

defineOptions({
  name: 'About',
})

const { t } = useAppI18n()

const { lastBuildTime, version, deps, devDeps, urls } = __APP_INFO__

const infoItems = computed<ICompUIDescriptionsItem[]>(
  () =>
    [
      {
        label: t('desc.about.info.version'),
        value: version,
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
          link: urls.doc,
        },
      },
      {
        label: t('desc.about.info.preview'),
        value: t('desc.about.info.preview'),
        type: 'link',
        typeProps: {
          type: 'primary',
          link: urls.demo,
        },
      },
      {
        label: t('desc.about.info.code'),
        value: t('desc.about.info.code'),
        type: 'link',
        typeProps: {
          type: 'primary',
          link: urls.github,
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
    ],
)

const DepItems = ref<ICompUIDescriptionsItem[]>(
  Object.entries(deps).map(([k, v]) => ({
    label: k,
    value: v,
    type: 'link',
    typeProps: { type: 'info', link: `https://www.npmjs.com/package/${k}` },
  })),
)

const DevDepItems = ref<ICompUIDescriptionsItem[]>(
  Object.entries(devDeps).map(([k, v]) => ({
    label: k,
    value: v,
    type: 'link',
    typeProps: { type: 'info', link: `https://www.npmjs.com/package/${k}` },
  })),
)
</script>

<template>
  <div class="space-y-2">
    <WCard
      :title="t('about.title.info')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <WDescriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="infoItems"
        :label-style="{ width: '30%' }"
        :content-style="{ width: '20%' }"
      />
    </WCard>

    <WCard
      :title="t('about.title.deps')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <WDescriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="DepItems"
        :label-style="{ width: '30%' }"
        :content-style="{ width: '20%' }"
      />
    </WCard>

    <WCard
      :title="t('about.title.devdeps')"
      size="small"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      header-preset="collapse"
    >
      <WDescriptions
        size="small"
        label-placement="left"
        bordered
        :column="2"
        :items="DevDepItems"
        :label-style="{ width: '30%' }"
        :content-style="{ width: '20%' }"
      />
    </WCard>
  </div>
</template>
