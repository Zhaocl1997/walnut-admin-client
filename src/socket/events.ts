export const AppSocketEvents = {
  SIGNIN: 'signin',
  SIGNOUT: 'signout',

  STATE: 'state',

  FORCE_QUIT: `force/quit/${fpId.value}`,

  OAUTH: () => `${fpId.value}/oauth`,
}
