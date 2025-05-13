<script lang="tsx" setup  generic="T">
import type { ICompUIDescriptionProps, ICompUIDescriptionsItem, ICompUIDescTypeLink } from '.'
import { omit } from 'lodash-es'

defineOptions({
  name: 'WCompUIDescriptions',
})

const { items, colon = false } = defineProps<ICompUIDescriptionProps>()

const { t } = useAppI18n()

const getData = computed(() => Object.fromEntries<BaseDataType>(items.map<[string, BaseDataType]>(i => [i.key!, i.value])))

const getShowItem = computed<ICompUIDescriptionsItem[]>(() => items.filter(i => getBoolean(i.show)))

function onClickText(item: ICompUIDescriptionsItem) {
  openExternalLink((item as ICompUIDescTypeLink<T>).typeProps!.link)
}

function onFormat(item: ICompUIDescriptionsItem) {
  return (typeof item.formatter === 'function'
    ? item.formatter(item.value, getData)
    : item.value) || t('app.base.none')
}

const showDict = ref(false)
onBeforeMount(async () => {
  if (items.some(i => i.type === 'dict')) {
    const dictTypes = items.filter(i => i.type === 'dict').map(i => i.typeProps.dictType)
    await initDict(dictTypes)
    showDict.value = true
  }
})
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
            {{ onFormat(item) }}
          </n-tag>

          <n-text
            v-else-if="item.type === 'link'"
            v-bind="item.typeProps"
            class="cursor-pointer"
            @click="onClickText(item)"
          >
            {{ onFormat(item) }}
          </n-text>

          <WJSON
            v-else-if="item.type === 'json'"
            v-bind="item.typeProps"
            :value="item.value"
          />

          <WDictLabel
            v-else-if="showDict && item.type === 'dict'"
            :dict-type="item.typeProps.dictType"
            :dict-value="item.value"
          />

          <div v-else class="whitespace-pre-wrap break-all">
            {{ onFormat(item) }}
          </div>
        </div>
      </template>
    </n-descriptions-item>
  </n-descriptions>
</template>
