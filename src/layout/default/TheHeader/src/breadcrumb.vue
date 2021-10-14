<script lang="tsx">
  import { getMaybeI18nMsg } from '/@/locales/utils'

  export default defineComponent({
    name: 'HeaderBreadCrumb',

    setup() {
      const route = useAppRoute()

      const getChildren = computed(() =>
        route.matched.filter((item) => item.meta && item.meta.title)
      )

      return () => (
        <n-breadcrumb>
          {getChildren.value.map((item) => (
            <n-breadcrumb-item>
              <span class="text-base text-primary">
                {getMaybeI18nMsg(item.meta.title)}
              </span>
            </n-breadcrumb-item>
          ))}
        </n-breadcrumb>
      )
    },
  })
</script>
