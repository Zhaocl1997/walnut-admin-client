<script lang="tsx">
  export default defineComponent({
    setup() {
      const route = useAppRoute()
      const { t } = useAppI18n()

      const getChildren = computed(() =>
        route.matched.filter((item) => item.meta && item.meta.title)
      )

      return () => (
        <n-breadcrumb>
          {getChildren.value.map((item) => (
            <n-breadcrumb-item>
              <span class="text-base">{t(item.meta.title!)}</span>
            </n-breadcrumb-item>
          ))}
        </n-breadcrumb>
      )
    },
  })
</script>
