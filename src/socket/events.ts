export const AppSocketEvents = {
  SIGNIN: 'signin',
  SIGNOUT: 'signout',

  STATE: 'state',

  OAUTH: (path: string) => `oauth/${path}/success/${fpId.value}`,
}
