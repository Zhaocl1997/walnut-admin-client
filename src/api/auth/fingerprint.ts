enum FingerprintEnum {
  FP_SET = '/auth/fp/set',
  FP_DEL = '/auth/fp/del',
}

/**
 * @description set fingerprint info
 */
export const setFP = () => {
  return AppAxios.post<boolean>({
    url: FingerprintEnum.FP_SET,
  })
}

/**
 * @description del fingerprint info
 */
export const delFP = () => {
  return AppAxios.delete<boolean>({
    url: FingerprintEnum.FP_DEL,
  })
}
