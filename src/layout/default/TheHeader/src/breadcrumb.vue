<script lang="tsx">
  import { defineComponent, computed } from 'vue'

  import { useAppRoute, useAppRouter } from '/@/router'
  import { indexName } from '/@/router/constant'
  import { getMaybeI18nMsg } from '/@/locales/utils'

  export default defineComponent({
    name: 'HeaderBreadCrumb',

    setup() {
      const route = useAppRoute()
      const router = useAppRouter()

      const getIndex = computed(() => route.matched[0].children[0])

      const getChildren = computed(() =>
        route.matched.filter((item) => item.meta && item.meta.title)
      )

      return () => {
        return (
          <n-breadcrumb>
            {router.currentRoute.value.name !== indexName && (
              <n-breadcrumb-item>
                <span class="text-base text-primary">
                  {getMaybeI18nMsg(
                    getIndex.value.meta && getIndex.value.meta.title
                  )}
                </span>
              </n-breadcrumb-item>
            )}

            {getChildren.value.map((item) => (
              <n-breadcrumb-item>
                <span class="text-base text-primary">
                  {getMaybeI18nMsg(item.meta.title)}
                </span>
              </n-breadcrumb-item>
            ))}
          </n-breadcrumb>
        )
      }
    },
  })
</script>
