export const HelloAPI = (cache = false) => {
  return AppAxios.get<string>(
    {
      url: '',
    },
    {
      needAuth: false,
      cache,
    },
  )
}
