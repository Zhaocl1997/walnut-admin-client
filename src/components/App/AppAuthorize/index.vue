<script lang="tsx">
  import { renderSlot } from 'vue'

  export default defineComponent({
    name: 'AppAuthorize',

    components: {
      AppAuthorizeIPTC: createAsyncComponent(() => import('./IPTC.vue')),
    },

    props: {
      value: String as PropType<string>,

      preset: {
        type: String as PropType<'null' | 'tip' | 'IPTC'>,
        default: 'null',
      },

      presetWidth: String as PropType<string>,
      presetHeight: String as PropType<string>,
    },

    setup(props, { slots }) {
      const userPermission = useAppStoreUserPermission()
      const { t } = useAppI18n()

      const render = () => {
        // this need higher priority
        // this can be used when current user do not have the permission code
        // but can input the permission code to show the slot
        if (props.preset === 'IPTC') {
          return (
            <AppAuthorizeIPTC
              permission={props.value}
              presetWidth={props.presetWidth}
              presetHeight={props.presetHeight}
            >
              {renderSlot(slots, 'default')}
            </AppAuthorizeIPTC>
          )
        }

        if (userPermission.hasPermission(props.value!)) {
          return renderSlot(slots, 'default')
        }

        if (props.preset === 'null') {
          return null
        }

        if (props.preset === 'tip') {
          return (
            <n-result
              style={{ width: props.presetWidth, height: props.presetHeight }}
              status="403"
              title={t('app.authorize.tip.title')}
              description={t('app.authorize.tip.desc')}
            ></n-result>
          )
        }
      }

      return () => render()
    },
  })
</script>

<style scoped>
  :deep(.w-result-header__title) {
    white-space: nowrap;
  }
</style>
