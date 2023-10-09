import axios from 'axios'
import { isEmpty } from 'lodash-es'

export const UAInfo = useAppStorage<UserAgentInfo>(AppConstPersistKey.UA_INFO, {}, { usePresetKey: false, expire: Number.POSITIVE_INFINITY })

export async function useUseragentInfo() {
  if (!isEmpty(UAInfo.value))
    return

  const res = await axios.get<UserAgentInfo>(EXTERNAL_LINKS.UA)

  if (res.status === 200)
    UAInfo.value = res.data
}
