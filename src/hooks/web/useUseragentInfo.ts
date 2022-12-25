import axios from 'axios'

export const useUseragentInfo = async () => {
  const userProfile = useAppStoreUserProfile()

  const res = await axios.get<UserProfileStateInfo>('https://ip.useragentinfo.com/json')

  if (res.status === 200)
    userProfile.setInfo(res.data)
}
