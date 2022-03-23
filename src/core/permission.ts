/**
 * @description Generate permissions array based on `menu`
 */
export const buildPermissions = (payload: AppSystemMenu[]): string[] =>
  payload.map((i) => i.permission!).filter((i) => i)
