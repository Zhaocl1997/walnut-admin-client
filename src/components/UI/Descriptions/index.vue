<script lang="tsx" setup>
import type { ICompUIDescriptionProps, ICompUIDescriptionsItem, ICompUIDescTypeDict, ICompUIDescTypeLink } from '.'
import { omit } from 'lodash-es'

defineOptions({
  name: 'WCompUIDescriptions',
})

const { items, colon = false } = defineProps<ICompUIDescriptionProps>()

const { t } = useAppI18n()

const showDict = ref(false)

const getData = computed(() => Object.fromEntries<StringOrNumber>(items.map<[string, StringOrNumber]>(i => [i.key!, i.value])))

const getShowItem = computed(() => items.filter(i => getBoolean(i.show)))

function onClickText(item: ICompUIDescriptionsItem) {
  openExternalLink((item as ICompUIDescTypeLink).typeProps!.link)
}

onMounted(async () => {
  if (items.some(i => i.type === 'dict')) {
    await initDict(items.filter(i => i.type === 'dict').map(i => (i as ICompUIDescTypeDict).dictType))
    showDict.value = true
  }
})

defineExpose({})
</script>

<template>
  <n-descriptions>
    <n-descriptions-item v-for="(item, index) in getShowItem" :key="index" v-bind="omit(item, 'label')">
      <template #label>
        <span :style="item.labelStyle" class="whitespace-nowrap" :class="[item.labelClass]">{{ colon ? `${item.label}：` : item.label }}</span>
      </template>

      <template #default>
        <div :class="item.contentClass" :style="item.contentStyle">
          <n-tag
            v-if="item.type === 'tag'"
            v-bind="item.typeProps"
          >
            {{ item.value }}
          </n-tag>

          <n-text
            v-else-if="item.type === 'link'"
            v-bind="item.typeProps"
            class="cursor-pointer"
            @click="onClickText(item)"
          >
            {{ item.value }}
          </n-text>

          <WJSON
            v-else-if="item.type === 'json'"
            v-bind="item.typeProps"
            :value="item.value"
          />

          <WDictLabel
            v-else-if="item.type === 'dict'"
            :dict-type="item.dictType"
            :dict-value="item.value"
          />

          <span v-else class="whitespace-pre-wrap break-all">
            {{ (typeof item.formatter === 'function'
              ? item.formatter(item.value, getData)
              : item.value) || t('app.base.none') }}
          </span>
        </div>
      </template>
    </n-descriptions-item>
  </n-descriptions>
</template>
