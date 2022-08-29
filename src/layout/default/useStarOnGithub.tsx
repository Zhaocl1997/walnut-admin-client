export const useStarOnGithub = () => {
  const onClick = () => {
    openExternalLink(URLS.projectGithub)
  }

  useAppNotiInfo('', {
    duration: 30000,
    description:
      'Please give me a star if you like this project !! Your star means a lot to me !!!!',
    content: () => {
      return (
        <n-space vertical size="small">
          <n-button text size="small" type="info" onClick={onClick}>
            <w-icon icon="ant-design:star-outlined" width="18"></w-icon>
            <span class="font-semibold ml-1">Star Right Now</span>
          </n-button>
        </n-space>
      )
    },
  })
}
