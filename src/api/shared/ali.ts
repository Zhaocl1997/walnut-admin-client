/**
 * @description get ali oss sts token from backend
 */
export const getAliSTSToken = () => {
  return AppAxios.get<{
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
    region: string
    bucket: string
  }>(
    {
      url: '/shared/ali/sts',
      _autoDecryptResponseData: true,
    },
  )
}
