// TODO 111
import WIcon from '@/components/UI/Icon'

export function useStarOnGithub() {
  const { t } = useAppI18n()
  const appSetting = useAppStoreSetting()

  function onClick() {
    openExternalLink(__APP_INFO__.urls.github)
  }

  function onCheckboxChange(val: boolean) {
    setCookie('dontShowStar', val)
  }

  const dontShow = getCookie('dontShowStar')

  if (dontShow === 'true')
    return

  useAppNotiInfo('', {
    duration: 30000,
    description: t('app.github.desc'),
    containerStyle: {
      marginTop: `${appSetting.header.height}px`,
    },
    content: () => {
      return (
        <n-space vertical size="small">
          <n-button text size="small" type="info" onClick={onClick}>
            <WIcon icon="ant-design:star-outlined" width="18"></WIcon>
            <span class="ml-1 font-semibold">{t('app.github.star')}</span>
          </n-button>

          <n-checkbox size="small" onUpdateChecked={onCheckboxChange}>{t('app.base.dontShowAgain')}</n-checkbox>
        </n-space>
      )
    },
  })
}
