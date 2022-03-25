<script lang="tsx">
  import type { WDescriptionProps, WDescriptionsItem } from './types'

  import { omit } from 'lodash-es'

  import { props } from './props'

  export default defineComponent({
    name: 'WDescriptions',

    props,

    setup(props: WDescriptionProps) {
      const { t } = useAppI18n()

      const renderItemsContent = (item: WDescriptionsItem) => {
        if (item.type === 'tag')
          return <n-tag {...item.typeProps}>{item.value}</n-tag>

        if (item.type === 'link')
          return (
            <n-text
              {...item.typeProps}
              onClick={() => openExternalLink(item.typeProps!.link)}
              class="cursor-pointer"
            >
              {item.value}
            </n-text>
          )

        if (item.type === 'json') return <w-JSON value={item.value}></w-JSON>

        if (item.type === 'dict') {
          const dictData = AppDictMap.get(item.dictType!)

          const target = dictData?.find((i) => i.value === item.value)

          if (!target?.label) return

          if (target.tagType) {
            return <n-tag type={target.tagType}>{t(target.label!)}</n-tag>
          }

          return <span>{t(target.label!)}</span>
        }

        return (
          <span class="whitespace-pre-wrap break-all">
            {typeof item.formatter === 'function'
              ? item.formatter(item.value as string)
              : item.value}
          </span>
        )
      }

      const renderItems = () =>
        props.items?.map((i) => (
          <n-descriptions-item {...omit(i, 'label')}>
            {{
              default: () => renderItemsContent(i),
              label: () => (props.colon ? `${i.label} :` : i.label),
            }}
          </n-descriptions-item>
        ))

      onMounted(async () => {
        // cached for dict column
        await Promise.all(
          props.items?.map(
            async (i) => i.type === 'dict' && (await useDict(i.dictType!))
          )!
        )
      })

      return () => <n-descriptions>{renderItems()}</n-descriptions>
    },
  })
</script>
