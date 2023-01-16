import { BaseAPI } from '../../base'

const { demo } = useAppEnv('build')

export const monitorUserAPI = new BaseAPI<AppMonitorUserModel>({
  model: 'app',
  section: 'monitor/user',
})

export const forceQuit = (id: string) => {
  return AppAxios.delete({
    url: `/app/monitor/user/force-quit/${id}`,
    _demonstrate: demo,
  })
}
