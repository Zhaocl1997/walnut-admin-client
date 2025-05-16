// TODO 111
import WIcon from '@/components/UI/Icon'

export function useStarOnGithub() {
  const appSetting = useAppStoreSetting()

  const onClick = () => {
    openExternalLink(__APP_INFO__.urls.github)
  }

  useAppNotiInfo('', {
    duration: 30000,
    description:
      'Please give me a star if you like this project!! Your star means a lot to me!!!!',
    containerStyle: {
      marginTop: `${appSetting.getHeaderHeight}px`,
    },
    content: () => {
      return (
        <n-space vertical size="small">
          <n-button text size="small" type="info" onClick={onClick}>
            <WIcon icon="ant-design:star-outlined" width="18"></WIcon>
            <span class="ml-1 font-semibold">Star Right Now</span>
          </n-button>
        </n-space>
      )
    },
  })
}
