export const AppSocketEvents = {
  SIGNIN: 'signin',
  SIGNOUT: 'signout',

  FORCE_QUIT: `force/quit/${fpId.value}`,

  OAUTH: () => `${fpId.value}/oauth`,
}
