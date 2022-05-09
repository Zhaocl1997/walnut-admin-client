// get oss sts token
export const getAliSTSToken = () => {
  return AppAxios.get<{
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
    region: string
    bucket: string
  }>({
    url: '/shared/ali/sts',
  })
}
