export const useSohuApi = () => {
  const userProfile = useAppStoreUserProfile()

  return new Promise<void>((res, rej) => {
    useScriptTag(
      'https://pv.sohu.com/cityjson?ie=utf-8',

      () => {
        try {
          userProfile.setIP(window?.returnCitySN.cip)
          userProfile.setCityName(window?.returnCitySN.cname)
          res()
        } catch {
          rej()
        }
      }
    )
  })
}
