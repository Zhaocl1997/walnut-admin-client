export const useSohuApi = () => {
  const userProfile = useAppStoreUserProfile()

  return new Promise<void>((resolve, reject) => {
    useScriptTag(
      'https://pv.sohu.com/cityjson?ie=utf-8',

      () => {
        try {
          userProfile.setIP(window?.returnCitySN.cip)
          userProfile.setCityName(window?.returnCitySN.cname)
          resolve()
        }
        catch (e) {
          reject(e)
        }
      },
    )
  })
}
