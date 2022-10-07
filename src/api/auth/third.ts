enum ThirdEnum {
  GITHUB = '/auth/third/github/oauth',
  GITEE = '/auth/third/gitee/oauth',
}

/**
 * @description get github oauth uri
 */
export const getGithubUri = () => {
  return AppAxios.get<{ uri: string }>({
    url: ThirdEnum.GITHUB,
  })
}

/**
 * @description get gitee oauth uri
 */
export const getGiteeUri = () => {
  return AppAxios.get<string>({
    url: ThirdEnum.GITEE,
  })
}
