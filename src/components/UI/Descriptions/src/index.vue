<script lang="tsx">
import { omit } from 'lodash-es'
import type { WDescriptionProps, WDescriptionsItem } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WDescriptions',

  inheritAttrs: false,

  props,

  setup(props: WDescriptionProps, { attrs }) {
    const { t } = useAppI18n()

    const recordObject = Object.fromEntries<StringOrNumber>(props.items?.map<[string, StringOrNumber]>(i => [i.key!, i.value])!)

    const renderItemsContent = (item: WDescriptionsItem) => {
      if (item.type === 'tag')
        return <n-tag {...item.typeProps}>{item.value}</n-tag>

      if (item.type === 'link') {
        return (
          <n-text
            {...item.typeProps}
            onClick={() => openExternalLink(item.typeProps!.link)}
            class="cursor-pointer"
          >
            {item.value}
          </n-text>
        )
      }

      if (item.type === 'json')
        return <WJSON value={item.value}></WJSON>

      if (item.type === 'dict') {
        const res = AppDictMap.get(item.dictType!)

        const target = res?.dictData?.find(
          i =>
            (i.value === 'true'
              ? true
              : i.value === 'false'
                ? false
                : i.value) === item.value,
        )

        if (!target?.label)
          return

        if (target.tagType) {
          return (
            <n-tag size="small" type={target.tagType}>
              {t(target.label!)}
            </n-tag>
          )
        }

        return <span>{t(target.label!)}</span>
      }

      return (
        <span class="whitespace-pre-wrap break-all">
          {(typeof item.formatter === 'function'
            ? item.formatter(item.value as string, recordObject)
            : item.value) || t('app.base.none')}
        </span>
      )
    }

    const renderItems = () =>
      props.items?.filter(i => getBoolean(i.show)).map(i => (
        <n-descriptions-item {...omit(i, 'label')}>
          {{
            default: () => renderItemsContent(i),
            label: () => (
              <span class="whitespace-nowrap">
                {props.colon ? `${i.label} :` : i.label}
              </span>
            ),
          }}
        </n-descriptions-item>
      ))

    onMounted(async () => {
      // cached for dict column
      await Promise.all(
        props.items?.map(
          async i => i.type === 'dict' && (await useDict(i.dictType!)),
        )!,
      )
    })

    return () => <n-descriptions {...attrs}>{renderItems()}</n-descriptions>
  },
})
</script>
