enum ThirdEnum {
  GITHUB = '/auth/oauth/github/url',
  GITEE = '/auth/oauth/gitee/url',
  WEIBO = '/auth/oauth/weibo/url',
}

/**
 * @description get github oauth uri
 */
export function getGithubUri() {
  return AppAxios.get<{ uri: string }>({
    url: ThirdEnum.GITHUB,
  })
}

/**
 * @description get gitee oauth uri
 */
export function getGiteeUri() {
  return AppAxios.get<string>({
    url: ThirdEnum.GITEE,
  })
}

/**
 * @description get weibo oauth uri
 */
export function getWeiboUri() {
  return AppAxios.get<string>({
    url: ThirdEnum.WEIBO,
  })
}
