<script lang="tsx">
  import type { WDescriptionProps, WDescriptionsItem } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WDescriptions',

    props,

    emits: [],

    setup(props: WDescriptionProps, { attrs, slots, emit, expose }) {
      const renderItemsContent = (item: WDescriptionsItem) => {
        if (item.type === 'tag')
          return <n-tag {...item.typeProps}>{item.value}</n-tag>

        if (item.type === 'link')
          return (
            <n-text
              {...item.typeProps}
              onClick={() => window.open(item.typeProps!.link, '_blank')}
              class="cursor-pointer"
            >
              {item.value}
            </n-text>
          )

        return item.value
      }

      const renderItems = () => {
        return props.items?.map((i) => (
          <n-descriptions-item {...i}>
            {renderItemsContent(i)}
          </n-descriptions-item>
        ))
      }

      return () => <n-descriptions>{renderItems()}</n-descriptions>
    },
  })
</script>
